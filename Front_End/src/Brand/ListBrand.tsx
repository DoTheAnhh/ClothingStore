import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { BrandResponse } from '../Interface/interface';
import Table, { ColumnsType } from 'antd/es/table';
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API';
import axios from 'axios';
import { Button, Modal } from 'antd';
import BrandForm from './BrandForm';

const ListBrand: React.FC = () => {

  const [brands, setBrands] = useState<BrandResponse[]>([])

  const [isModalOpenBrand, setIsModalBrand] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);

  const findAllBrand = async () => {
    const res = await axios.get(LOCALHOST + MAPPING_URL.BRAND + API_URL.BRAND.FIND_ALL_BRAND)
    setBrands(res.data)
  }

  const showModalBrand = () => {
    setSelectedBrand(null);
    setIsModalBrand(true);
  }

  const showModalBrandById = (record: BrandResponse) => {
    setSelectedBrand(record.id);
    setIsModalBrand(true);
  }

  const handleCancelBrand = () => {
    setIsModalBrand(false);
    setSelectedBrand(null);
    findAllBrand()
  }

  const columns: ColumnsType<BrandResponse> = [
    {
      title: 'Brand name',
      dataIndex: 'brandName',
      key: 'brandName',
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
            onClick={() => showModalBrandById(record)}
          />
        </span>
      ),
    },
  ]

  useEffect(() => {
    findAllBrand()
  }, [])

  return (
    <>
      <Button style={{ float: 'right', marginBottom: 10 }} onClick={showModalBrand}>
        New brand +
      </Button>
      <Modal
        open={isModalOpenBrand}
        onCancel={handleCancelBrand}
        footer={null}
      >
        <BrandForm
          handleCancelBrandModal={handleCancelBrand}
          selectedBrand={selectedBrand}
        />
      </Modal>
      <Table<BrandResponse>
        dataSource={brands}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    </>
  )
}

export default ListBrand