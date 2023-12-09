<?php

class BaseController{
    const VIEW_FOLDER = 'Views';
    const MODEL_FOLDER = 'Models';

    protected function view($viewPath){
        return require self::VIEW_FOLDER . '/' . str_replace('.','/',$viewPath) . '.php';
    }

    protected function loadModel($modelPath){
        return require self::MODEL_FOLDER . '/' . $modelPath . '.php';
    }
}