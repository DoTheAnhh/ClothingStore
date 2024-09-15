import React, { useEffect, useState } from 'react'
import { TypeResponse } from '../Interface/interface'
import axios from 'axios';
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API';
import Table, { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { EditOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import TypeForm from './TypeForm';

const ListType: React.FC = () => {

  const [types, setTypes] = useState<TypeResponse[]>([])

  const [isModalOpenType, setIsModalType] = useState(false);
  const [selectedType, setSelectedType] = useState<number | null>(null);

  const findAllType = async () => {
    const res = await axios.get(LOCALHOST + MAPPING_URL.TYPE + API_URL.TYPE.FIND_ALL_TYPE)
    setTypes(res.data)
  }

  const showModalType = () => {
    setSelectedType(null);
    setIsModalType(true);
  }

  const showModalTypeById = (record: TypeResponse) => {
    setSelectedType(record.id);
    setIsModalType(true);
  }

  const handleCancelType = () => {
    setIsModalType(false);
    setSelectedType(null);
    findAllType();
  }

  const columns: ColumnsType<TypeResponse> = [
    {
      title: 'Type name',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: 'Create date',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Update date',
      dataIndex: 'updateDate',
      key: 'updateDate',
      render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <span>
          <EditOutlined
            style={{ cursor: 'pointer', float: 'left' }}
            onClick={() => showModalTypeById(record)}
          />
        </span>
      ),
    },
  ]

  useEffect(() => {
    findAllType()
  }, [])


  return (
    <>
      <Button style={{ float: 'right', marginBottom: 10 }} onClick={showModalType}>
        New type +
      </Button>
      <Modal
        open={isModalOpenType}
        onCancel={handleCancelType}
        footer={null}
      >
        <TypeForm
          handleCancelTypeModal={handleCancelType}
          selectedType={selectedType}
        />
      </Modal>
      <Table<TypeResponse>
        dataSource={types}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    </>
  )
}

export default ListType