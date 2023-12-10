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
        if (isset($_GET['user']))
            header("Location: ../frontend/user.html");
        else
            header("Location: ../frontend/dashboard.html?tab=mgr__booking");
    }

    public function addBooking()
    {
        $data = [
            'title'    => $_POST['title'],
            'content'  => $_POST['content'],
            'timein'   => $_POST['timein'],
            'timeout'  => $_POST['timeout'],
            'room_id'  => $_POST['room_id'],
            'user_id'  => $_COOKIE['user_id']
        ];

        $this->bookingModel->store($data);
        header("Location: ../frontend/index.html");
    }
}
