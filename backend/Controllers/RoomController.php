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

    public function findRoom()
    {
        $id = $_GET['id'];
        $room = $this->roomModel->findId($id);
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($room);
    }

    public function addRoom()
    {
        $data = [
            'name'      => $_POST['name'],
            'location'  => $_POST['location'],
            'img'       => $_POST['img'],
            'capacity'  => $_POST['capacity'],
            'utility'   => $_POST['utility']
        ];

        $this->roomModel->store($data);
        header("Location: ../frontend/dashboard.html?tab=mgr__room");
    }

    public function editRoom()
    {
        $id = $_GET['id'];
        $data = [
            'name'      => $_POST['name'],
            'location'  => $_POST['location'],
            'img'       => $_POST['img'],
            'capacity'  => $_POST['capacity'],
            'utility'   => $_POST['utility']
        ];

        $this->roomModel->edit($id, $data);

        header("Location: ../frontend/dashboard.html?tab=mgr__room");
    }

    public function delRoom()
    {
        $id = $_GET['id'];
        $data = [
            'status' => '0'
        ];
        $this->roomModel->edit($id, $data);
        header("Location: ../frontend/dashboard.html?tab=mgr__room");
    }


}
