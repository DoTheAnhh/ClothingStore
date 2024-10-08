import React, { useCallback, useEffect, useState } from 'react'
import { CustomerRequest, ImageResponse } from '../Interface/interface';
import axios from 'axios';
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API';
import { Button, Col, Form, Input, Popconfirm, Radio, Row } from 'antd';
import { toast } from 'react-toastify';
interface CustomerProps {
  handleCancelCustomerModal: () => void;
  selectedCustomer: number | null;
}

const CustomerForm: React.FC<CustomerProps> = ({ handleCancelCustomerModal, selectedCustomer }) => {

  const [customer, setCustomer] = useState<CustomerRequest>()

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const findCustomerById = async () => {
    try {
      if (selectedCustomer) {
        const res = await axios.get(
          LOCALHOST + MAPPING_URL.CUSTOMER + API_URL.CUSTOMER.FIND_ALL_CUSTOMER + `/${selectedCustomer}`
        )
        setCustomer(res.data)
        await findAllImageByCustomerlId(res.data.id)
      }
    } catch (e) {
      console.error(e);
    }
  }

  const findAllImageByCustomerlId = async (customerId: number) => {
    try {
      const url = `${LOCALHOST}${MAPPING_URL.IMAGE}${API_URL.IMAGE.FIND_IMAGE_BY_CUSTOMER_ID}/${customerId}`;
      const response = await axios.get<ImageResponse[]>(url);
      const newImageUrl = response.data[0]?.imageUrl || null;
      setImageUrl(newImageUrl);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleChangeSingleField = useCallback(
    (field: string) => {
      return (value: string | number) => {
        setCustomer((prev) => ({
          ...prev,
          [field]: value,
        }));
      };
    },
    []
  );

  const uploadImage = async (customerId: number, token: string): Promise<string | null> => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('customerId', customerId.toString());

      try {
        const response = await axios.post(
          `${LOCALHOST}${MAPPING_URL.IMAGE}${API_URL.IMAGE.UPLOAD_IMG_CUSTOMER}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        return response.data.imageUrl || null;
      } catch (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    }
    return null;
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const decodeJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Invalid token");
      return null;
    }
  };

  const handleInsertOrUpdate = async () => {
    try {
      let id: number;
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const decodedToken = decodeJwt(token);
      if (!decodedToken) {
        console.error('Invalid token');
        return;
      }

      const userRole = decodedToken.role;

      if (userRole !== 'ADMIN') {
        console.error('User does not have the required ADMIN role');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (selectedCustomer) {
        await axios.put(LOCALHOST + MAPPING_URL.CUSTOMER + API_URL.CUSTOMER.EDIT + `/${selectedCustomer}`, customer, config);
        toast.success('Updated customer successfully', {
          autoClose: 5000,
        })
        id = selectedCustomer;
      } else {
        const customerWithPass = {
          ...customer,
          password: '123',
        };
        const response = await axios.post(LOCALHOST + MAPPING_URL.CUSTOMER + API_URL.CUSTOMER.INSERT, customerWithPass, config)
        toast.success('Insert customer successfully', {
          autoClose: 5000,
        })
        id = response.data;
      }

      await uploadImage(id, token);

      handleCancelCustomerModal()
    } catch (e) {
      toast.error("Error insert/update", {
        autoClose: 5000,
      })
    }
  }

  const clearField = () => {
    setCustomer(undefined)
    setImageUrl(null);
  }

  const handleBirthdayChange = (value: string) => {
    handleChangeSingleField("birthday")(value);

    if (value) {
      const birthYear = new Date(value).getFullYear();
      const currentYear = new Date().getFullYear();
      const calculatedAge = currentYear - birthYear;

      handleChangeSingleField("age")(calculatedAge);
    }
  };

  useEffect(() => {
    findCustomerById()
    clearField()
  }, [selectedCustomer])

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Name" required>
            <Input
              value={customer?.name}
              onChange={(e) => handleChangeSingleField("name")(e.target.value)}
            ></Input>
          </Form.Item>
          <Form.Item label="Birthday" required>
            <Input
              type="date"
              value={customer?.birthday}
              onChange={(e) => handleBirthdayChange(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Age" required>
            <Input
              value={customer?.age}
              type="number"
              disabled
            />
          </Form.Item>
          <Form.Item label="Gender" required>
            <Radio.Group
              onChange={(e) => handleChangeSingleField("gender")(e.target.value)}
              value={customer?.gender}
            >
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Email" required>
            <Input
              value={customer?.email}
              onChange={(e) => handleChangeSingleField("email")(e.target.value)}
            ></Input>
          </Form.Item>
          <Form.Item label="Password" required style={{ display: 'none' }}>
            <Input
              value={customer?.password}
              onChange={(e) => handleChangeSingleField("password")(e.target.value)}
            ></Input>
          </Form.Item>
          <Form.Item label="Role" required>
            <Radio.Group
              onChange={(e) => handleChangeSingleField("role")(e.target.value)}
              value={customer?.role}
            >
              <Radio value={"ADMIN"}>ADMIN</Radio>
              <Radio value={"USER"}>USER</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Image" required>
            <Input type='file' onChange={onFileChange} />
            {imageUrl && (
              <div style={{ marginTop: 16 }}>
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{ width: 100, height: 100, objectFit: 'cover' }}
                />
              </div>
            )}
          </Form.Item>
        </Col>
        <Form.Item>
          <Popconfirm
            title="Are you sure you want to submit ?"
            onConfirm={() => handleInsertOrUpdate()}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Submit</Button>
          </Popconfirm>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default CustomerForm