import React, { useCallback, useEffect, useState } from 'react'
import { CustomerRequest, CustomerResponse } from '../../../Interface/interface'
import axios from 'axios'
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../APIs/API'
import { Avatar, Button, Col, Form, Input, Popconfirm, Radio, Row, Upload } from 'antd'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import HeaderLayoutAdmin from '../Header/HeaderLayoutAdmin'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Profile: React.FC = () => {

  const nagigator = useNavigate()

  const [customer, setCustomer] = useState<CustomerRequest>()

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

  const userId = decodedToken.id;

  const getCustomerById = async () => {
    const res = await axios.get(LOCALHOST + MAPPING_URL.CUSTOMER + API_URL.CUSTOMER.FIND_ALL_CUSTOMER + `/${userId}`)
    setCustomer(res.data)
  }

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

  const handleInsertOrUpdate = async () => {
    try {
      const userRole = decodedToken.role;

      if (userRole !== 'ADMIN') {
        console.error('User does not have the required ADMIN role');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (userId) {
        await axios.put(LOCALHOST + MAPPING_URL.CUSTOMER + API_URL.CUSTOMER.EDIT + `/${userId}`, customer, config);
        toast.success('Updated customer successfully', {
          autoClose: 5000,
        })
      }
    } catch (e) {
      toast.error("Error update", {
        autoClose: 5000,
      })
    }
  }

  const clearField = () => {
    setCustomer(undefined)
  }

  const back = () => {
    nagigator("/admin")
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
    getCustomerById()
    clearField()
  }, [userId])

  return (
    <>
      <HeaderLayoutAdmin />
      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h2>Hồ Sơ Của Tôi</h2>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          <Form
            layout="vertical"
            style={{ marginTop: 80 }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Email">
                  <Input
                    value={customer?.email}
                    onChange={(e) => handleChangeSingleField("email")(e.target.value)}
                    disabled
                  ></Input>
                </Form.Item>

                <Form.Item label="Password" required>
                  <Input
                    value={customer?.password}
                    onChange={(e) => handleChangeSingleField("password")(e.target.value)}
                    disabled
                    type='password'
                  ></Input>
                </Form.Item>

                <Form.Item label="Name">
                  <Input
                    value={customer?.name}
                    onChange={(e) => handleChangeSingleField("name")(e.target.value)}
                  ></Input>
                </Form.Item>

                <Form.Item label="Gender">
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
                <Form.Item label="Birthday">
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

                <Form.Item label="Location" required>
                  <Input
                    value={customer?.location}
                    onChange={(e) => handleChangeSingleField("location")(e.target.value)}
                  ></Input>
                </Form.Item>

                <Form.Item label="Role" required>
                  <Radio.Group
                    onChange={(e) => handleChangeSingleField("role")(e.target.value)}
                    value={customer?.role}
                    disabled
                  >
                    <Radio value={"ADMIN"}>ADMIN</Radio>
                    <Radio value={"USER"}>USER</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item style={{marginLeft: 260}}>
              <Row gutter={16} justify="center">
                <Col>
                  <Popconfirm
                    title="Are you sure you want to submit?"
                    onConfirm={() => handleInsertOrUpdate()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary">Submit</Button>
                  </Popconfirm>
                </Col>
                <Col>
                  <Popconfirm
                    title="Are you sure you want to go back?"
                    onConfirm={() => back()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>Back</Button>
                  </Popconfirm>
                </Col>
              </Row>
            </Form.Item>

          </Form>
        </div>

        <div style={{ textAlign: 'center', position: 'relative', top: '180px', marginLeft: '60px' }}>
          <Avatar size={100} icon={<UserOutlined />} />
          <div style={{ marginTop: '20px' }}>
            <Upload maxCount={1} accept="image/*" showUploadList={false}>
              <Button style={{ marginBottom: 10 }}>Chọn Ảnh</Button>
            </Upload>
          </div>
          <p>Dung lượng file tối đa 1 MB</p>
          <p>Định dạng: JPEG, PNG</p>
        </div>

      </div >
    </>
  )
}

export default Profile