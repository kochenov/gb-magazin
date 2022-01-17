'use strict'

// Кнопка корзины
let linkCart = document.getElementById("cart-link");
let cartInfoBlock = document.getElementById("cart-info-content");
// Все кнопки добавления товаров в корзину
let allButtonsInCart = document.querySelectorAll('.products__item .btn-add');
// На кнопку корзины добавлено событие клика
linkCart.addEventListener('click', showCartInfo);

let table = cartInfoBlock.querySelector('table tbody');
/**
 * Добавляет эмементу с информацией в корзине класс для показа блока
 * Если блок уже показан, то скрываем его
 * @param {*} event 
 */
function showCartInfo(event) {
    event.preventDefault();
    cartInfoBlock.classList.toggle('hidden-all');
}

allButtonsInCart.forEach((btn) => {
    btn.addEventListener('click', addProductToCart);
});

function addProductToCart(event) {

    let product; // [хранение данных товара]
    let curentBtn = event.target; // Нажатая кнопка
    let blockProduct = curentBtn.closest('.products__item'); // Блок продукта для извлечения ID
    let productName = blockProduct.querySelector('.products__title-link').textContent; // Имя продукта
    let productPrice = blockProduct.querySelector('.products__price').textContent.slice(1); // Цена


    // Проверяем есть ли уже данный продукт в корзине
    let productItem = isProductInCart(blockProduct.dataset.id);
    if (productItem === false) {
        // Сформировать объект и добавит в таблицу
        product =
        {
            id: blockProduct.dataset.id,
            name: productName,
            count: 1,
            price: productPrice,
            priceCount: productPrice,
        };
        table.insertAdjacentHTML('beforeend', generateStr(product));
    } else { // Edit
        // Формирую обьект продукт
        product =
        {
            //id: blockProduct.dataset.id,
            //name: productItem.querySelector('.cart-product-name').textContent,
            count: Number(productItem.querySelector('.cart-product-count').textContent.slice(0, -4)) + 1,
            price: Number(productItem.querySelector('.catr-product-price').textContent.slice(1)),
            priceCount: Number(productItem.querySelector('.catr-product-price-count').textContent.slice(1)),
        };
        console.log(product);
        productItem.querySelector('.cart-product-count').textContent = product.count + ' шт.';
        productItem.querySelector('.catr-product-price-count').textContent = '$' + product.price * product.count;
    }

    // Меняю количество товатор в корзине 
    counProductInCart();
    // Меняю итоговую стоимость товаров
    counPriceInCart();

}

/**
 * Считает количество товаров в корзине и выводит их в иконке рядом с корзинов
 */
function counProductInCart() {
    let countEl = document.querySelector('.header-col-right__count-product');
    // Количество El товаров в корзине
    let listEl = document.querySelectorAll('.cart-product-item .cart-product-count');

    let n = 0;
    listEl.forEach((value) => {

        n = n + Number(value.textContent.slice(0, -4));
    });
    countEl.textContent = n;
}

/**
 * Считает количество товаров в корзине и выводит их в иконке рядом с корзинов
 */
function counPriceInCart() {
    let priceEl = document.querySelector('.products-price-count');
    // Количество El товаров в корзине
    let listEl = document.querySelectorAll('.cart-product-item .catr-product-price-count');

    let n = 0;
    listEl.forEach((value) => {

        n = n + Number(value.textContent.slice(1));
    });
    priceEl.textContent = '$' + n;

}


function isProductInCart(productId) {
    let n = false;
    let productCart = cartInfoBlock.querySelectorAll('.cart-product-item');
    productCart.forEach((item) => {
        if (item.dataset.id === productId) {
            n = item;
        }
    });
    return n;
}
/**
 * Генерация строки для вставки в страницу
 * Используется в случаи добавления запаиси
 * @param {*} product 
 * @returns 
 */
function generateStr(product) {
    let str = `
    <tr class="cart-product-item" data-id="${product.id}">
        <td class="cart-product-name">${product.name}</td>
        <td class="cart-product-count">${product.count} шт.</td>
        <td class="catr-product-price">$${product.price}</td>
        <td class="catr-product-price-count">$${product.priceCount}</td>
    </tr>
    `;

    return str;
}
