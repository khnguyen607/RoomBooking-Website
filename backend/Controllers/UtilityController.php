<?php

class UtililyController extends BaseController
{
    private $utilityModel;

    public function __construct()
    {
        $this->loadModel('UtilityModel');
        $this->utilityModel = new UtilityModel;
    }

    public function index()
    {
        $rooms = $this->utilityModel->getAll();

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($rooms);
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

        $this->utilityModel->store($data);
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

        $this->utilityModel->edit($id, $data);

        header("Location: ../frontend/dashboard.html?tab=mgr__room");
    }

    public function delRoom()
    {
        $id = $_GET['id'];
        $data = [
            'status' => '0'
        ];
        $this->utilityModel->edit($id, $data);
        header("Location: ../frontend/dashboard.html?tab=mgr__room");
    }


}
