<?php

class RoomController extends BaseController
{
    private $roomModel;

    public function __construct()
    {
        $this->loadModel('RoomModel');
        $this->roomModel = new RoomModel;
    }

    public function index()
    { 
        $rooms = $this->roomModel->getAll();

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($rooms);
    }

    public function show()
    {
        $id = $_GET['id'];
        $room = $this->roomModel->findId($id);
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($room);
    }
}
