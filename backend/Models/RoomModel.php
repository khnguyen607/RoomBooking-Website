<?php

class RoomModel extends BaseModel
{
    const TABLE = 'rooms';

    public function getAll($select = ['*'])
    {
        return $this->all(self::TABLE, $select);
    }

    public function findId($id)
    {
        return $this->find(self::TABLE, $id);
    }

    public function store(){
        $data =[
            'id'        => '3',
            'name'      => 'Phòng học nghiên cứu',
            'content'   => '',
            'img'       => null,
            'quantity'  => '3'
        ];
        
        return $this->create(self::TABLE, $data);   
    }
}
