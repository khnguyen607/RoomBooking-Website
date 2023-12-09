<?php
class BaseModel extends Database
{
    protected $connect;

    public function __construct()
    {
        $this->connect =  $this->connect();
    }

    // Lấy tất cả dữ liệu 
    public function all($table, $select = ['*'])
    {
        $select = implode(',', $select);
        $sql = "SELECT $select FROM $table";
        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }

    // lấy ra dữ liệu 1 bản ghi trong bảng
    public function find($table, $id)
    {
        $sql = "SELECT * FROM $table WHERE id = $id LIMIT 1";
        $query = $this->_query($sql);
        return mysqli_fetch_assoc($query);
    }

    // thêm dữ liệu 
    public function create($table, $data = [])
    {
        // $this->create();
    }

    // cập nhật dữ liệu
    public function update()
    {
    }

    // xóa dữ liệu 
    public function delete()
    {
    }

    // truy vấn sql
    private function _query($sql)
    {
        return mysqli_query($this->connect, $sql);
    }
}
