import React, { useCallback, useEffect, useState } from 'react'
import { CustomerResponse, ImageResponse } from '../Interface/interface'
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API'
import axios from 'axios'
import Table, { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import { EditOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import CustomerForm from './CustomerForm'

const ListCustomer: React.FC = () => {

  const [customers, setCustomers] = useState<CustomerResponse[]>([])

  const [loadedImages, setLoadedImages] = useState<number[]>([]);

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

  const findAllCustomer = useCallback(async (page: number, size: number): Promise<void> => {
    try {
      const res = await axios.get(
        `${LOCALHOST}${MAPPING_URL.CUSTOMER}${API_URL.CUSTOMER.FIND_ALL_CUSTOMER}`, {
        params: {
          page: page - 1,
          size: size,
        },
      });

      const { content, page: pagination } = res.data;
      const totalElements = pagination.totalElements ?? 0;

      setTotalCustomer(totalElements)
      setTotalPages(Math.ceil(res.data.totalElements / size))

      const customersWithImages = await Promise.all(
        content.map(async (customer: CustomerResponse) => {
          const imageResponse = await findAllImageByCustomerId(customer.id) ?? [];
          return {
            ...customer,
            imageUrl: imageResponse[0]?.imageUrl || '',
          };
        })
      );
      setCustomers(customersWithImages)
    } catch (err) {
      console.error(err);
    }
  }, [])

  const findAllImageByCustomerId = useCallback(async (customerId: number) => {
    try {
      if (customerId && !loadedImages.includes(customerId)) {
        const url = `${LOCALHOST}${MAPPING_URL.IMAGE}${API_URL.IMAGE.FIND_IMAGE_BY_CUSTOMER_ID}/${customerId}`;
        const response = await axios.get<ImageResponse[]>(url);
        setLoadedImages((prev) => [...prev, customerId]);
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  }, [loadedImages]);

  const columns: ColumnsType<CustomerResponse> = [
    {
      title: 'Image',
      key: 'imageUrl',
      align: 'center',
      render: (record: { imageUrl: string }) => (
        <img
          src={record.imageUrl}
          alt="Customer"
          style={{ width: 100, height: 100, objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
      align: 'center',
      render: (birthday: string) => moment(birthday).format('DD/MM/YYYY'),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
      render: (gender) => (gender ? 'Nam' : 'Nữ')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
    },
    {
      title: 'Create date',
      dataIndex: 'createDate',
      key: 'createDate',
      align: 'center',
      render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Update date',
      align: 'center',
      dataIndex: 'updateDate',
      key: 'updateDate',
      
      render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Action',
      align: 'center',
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