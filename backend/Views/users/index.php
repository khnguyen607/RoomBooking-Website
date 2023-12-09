<?php
require "Controllers/BaseController.php";

$controllerName = ucfirst($_GET['controller']).'Controller';
$action =  $_GET['action'] ?? 'index';

require "Controllers/$controllerName.php";

$controlleObj = new $controllerName;
$controlleObj -> $action();