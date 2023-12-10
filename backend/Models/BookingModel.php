<?php

class BookingModel extends BaseModel
{
    const TABLE = 'booking';

    // ---CÁC PHƯƠNG THỨC CƠ BẢN--- 
    public function getAll($select = ['*'])
    {
        return $this->all(self::TABLE, $select);
    }
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

}
