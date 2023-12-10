<?php

class BookingController extends BaseController
{
    private $bookingModel;

    public function __construct()
    {
        $this->loadModel('BookingModel');
        $this->bookingModel = new BookingModel;
    }

    public function index()
    {
        $booking = $this->bookingModel->getAll();

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($booking);
    }

    public function findUser()
    {
        $id = $_GET['id'];
        $booking = $this->bookingModel->findId($id);

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($booking);
    }

    public function changeStatus()
    {
        $id = $_GET['id'];
        $data = [
            'status' => $_GET['status']
        ];
        $this->bookingModel->edit($id, $data);
        header("Location: ../frontend/dashboard.html?tab=mgr__booking");
    }

    // public function addStudent()
    // {
    //     $data = [
    //         'email'  => $_POST['email'],
    //         'name'  => $_POST['name'],
    //         'user'  => $_POST['user'],
    //         'pass'  => $_POST['pass']
    //     ];

    //     if ($this->bookingModel->checkuser_name($data['user'])) {
    //         $this->bookingModel->store($data);
    //         header("Location: ../frontend/auth-sign-in.html?user=" . $data['user']);
    //     } else {
    //         header("Location: ../frontend/auth-sign-up.html?name=" . $data['name']);
    //     }
    // }




}
