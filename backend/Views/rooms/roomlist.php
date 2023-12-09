<?php

$json_data = json_encode($data);
header('Content-Type: application/json');
echo $json_data;


