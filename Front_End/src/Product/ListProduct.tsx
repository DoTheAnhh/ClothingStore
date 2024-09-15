import React, { useEffect, useState } from 'react'
import { ProductResponse } from '../Interface/interface'
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API'
import axios from 'axios'
import Table, { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import { EditOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import ProductForm from './ProductForm'

const ListProduct: React.FC = () => {

  const [products, setProducts] = useState<ProductResponse[]>([])

  const [isModalOpenProduct, setIsModalProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const findAllProduct = async () => {
    try {
      const res = await axios.get(LOCALHOST + MAPPING_URL.PRODUCT + API_URL.PRODUCT.FIND_ALL_PRODUCT)
      setProducts(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const showModalProduct = () => {
    setSelectedProduct(null);
    setIsModalProduct(true);
  }

  const showModalProductById = (record: ProductResponse) => {
    setSelectedProduct(record.id);
    setIsModalProduct(true);
  }

  const handleCancelProduct = () => {
    setIsModalProduct(false);
    setSelectedProduct(null);
    findAllProduct();
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN')
  }

  const columns: ColumnsType<ProductResponse> = [
    {
      title: 'Code',
      dataIndex: 'productCode',
      key: 'productCode'
    },
    {
      title: 'Name',
      dataIndex: 'productName',
      key: 'productName'
    },
    {
      title: 'Price',
      dataIndex: 'productPrice',
      key: 'productPrice',
      render: (price: number) => formatPrice(price)
    },
    {
      title: 'Description',
      dataIndex: 'productDescription',
      key: 'productDescription'
    },
    {
      title: 'Brand',
      dataIndex: 'brandName',
      key: 'brandName'
    },
    {
      title: 'Type',
      dataIndex: 'typeName',
      key: 'typeName'
    },
    {
      title: 'Create date',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm')
    },
    {
      title: 'Update date',
      dataIndex: 'updateDate',
      key: 'updateDate',
      render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm')
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <span>
          <EditOutlined
            style={{ cursor: 'pointer', float: 'left' }}
            onClick={() => showModalProductById(record)}
          />
        </span>
      ),
    },
  ]

  useEffect(() => {
    findAllProduct()
  }, [])

  return (
    <>
      <Button style={{ float: 'right', marginBottom: 10 }} onClick={showModalProduct}>
        New product +
      </Button>
      <Modal
        open={isModalOpenProduct}
        onCancel={handleCancelProduct}
        footer={null}
      >
        <ProductForm
          handleCancelProductModal={handleCancelProduct}
          selectedProduct={selectedProduct}
        />
      </Modal>
      <Table<ProductResponse>
        dataSource={products}
        columns={columns}
        pagination={false}
      />
    </>
  )
}

export default ListProduct