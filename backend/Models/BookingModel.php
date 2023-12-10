<?php

class BookingModel extends BaseModel
{
    const TABLE = 'booking';

    // ---CÁC PHƯƠNG THỨC CƠ BẢN--- 
    public function findId($id)
    {
        return $this->find(self::TABLE, $id);
    }
    public function edit($id, $data)
    {
        return $this->update(self::TABLE, $id, $data);
    }
    public function delM($id)
    {
        return $this->delete(self::TABLE, $id);
    }
    public function store($data)
    {
        return $this->create(self::TABLE, $data);
    }
    // ---CÁC PHƯƠNG THỨC BỔ SUNG---
    public function getAll()
    {
        // return $this->all(self::TABLE, $select);
        $table = self::TABLE;
        $sql = "SELECT `$table`.*, rooms.name as 'location'
        FROM `$table`
        INNER JOIN rooms ON `$table`.room_id = rooms.id
        ";
        $query = $this->_query($sql);
        $data = [];
        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }
        return $data;
    }
}
