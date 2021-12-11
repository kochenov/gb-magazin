<?php
   $posts_json = file_get_contents('https://kochenov.ru/wp-json/wp/v2/posts');
   $decoded_json = json_decode($posts_json, false);

    function dump($var){
        echo "<pre>"; 
        print_r($var);
        echo "</pre>";
    }
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.min.css">
    <title>Дмитрий Коченов - Создание сайтов под ключ</title>
</head>

<body id="homepage">

    <?php  include_once("php/templates/header.php"); ?>
    <?php  include_once("php/templates/slider.php"); ?>
    <?php 
    
    foreach($decoded_json as $key => $value){
        echo $value->title->rendered."<br>";
    }
    
    ?>

    <?php //dump($decoded_json);?>

</body>

</html>