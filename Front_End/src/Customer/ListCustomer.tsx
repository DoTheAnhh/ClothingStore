import React, { useCallback, useEffect, useState } from 'react'
import { CustomerResponse } from '../Interface/interface'
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API'
import axios from 'axios'
import Table, { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import { EditOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import CustomerForm from './CustomerForm'

const ListCustomer: React.FC = () => {

  const [customers, setCustomers] = useState<CustomerResponse[]>([])

  const [isModalOpenCustomer, setIsModalCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalCustomer, setTotalCustomer] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const showModalCustomer = () => {
    setSelectedCustomer(null);
    setIsModalCustomer(true);
  }

  const showModalCustomerById = (record: CustomerResponse) => {
    setSelectedCustomer(record.id);
    setIsModalCustomer(true);
  }

  const handleCancelCustomer = () => {
    setIsModalCustomer(false);
    setSelectedCustomer(null);
    findAllCustomer(currentPage, pageSize);
  }

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    findAllCustomer(page, pageSize);
  }, [pageSize]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    findAllCustomer(1, newPageSize);
  }, []);

  const findAllCustomer = useCallback(async (page: number, size: number): Promise<void> => {
    try {
      const res = await axios.get(
        `${LOCALHOST}${MAPPING_URL.CUSTOMER}${API_URL.CUSTOMER.FIND_ALL_CUSTOMER}`, {
        params: {
          page: page - 1,
          size: size,
        },
      });
      setTotalCustomer(res.data.totalElements)
      setTotalPages(Math.ceil(res.data.totalElements / size))
      setCustomers(res.data.content)
    } catch (err) {
      console.error(err);
    }
  }, [])

  const columns: ColumnsType<CustomerResponse> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => (gender ? 'Nam' : 'Nữ')
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
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
            onClick={() => showModalCustomerById(record)}
          />
        </span>
      ),
    },
  ]

  useEffect(() => {
    findAllCustomer(currentPage, pageSize)
  }, [])

  return (
    <>
      <Button style={{ float: 'right', marginBottom: 10 }} onClick={showModalCustomer}>
        New customer +
      </Button>
      <Modal
        open={isModalOpenCustomer}
        onCancel={handleCancelCustomer}
        footer={null}
      >
        <CustomerForm
          handleCancelCustomerModal={handleCancelCustomer}
          selectedCustomer={selectedCustomer}
        />
      </Modal>
      <Table<CustomerResponse>
        dataSource={customers}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    </>
  )
}

export default ListCustomer