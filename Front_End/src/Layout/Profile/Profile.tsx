import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Col, Form, Input, Popconfirm, Radio, Row } from 'antd'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CustomerRequest, ImageResponse } from '../../Interface/interface'
import { API_URL, LOCALHOST, MAPPING_URL } from '../../APIs/API'

const Profile: React.FC = () => {

  const nagigator = useNavigate()

  const [customer, setCustomer] = useState<CustomerRequest>()
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
    await findAllImageByCustomerlId(res.data.id)
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
        });

        await uploadImage(userId, token);
        await getCustomerById();
      }
    } catch (e) {
      toast.error("Error update", {
        autoClose: 5000,
      });
    }
  };


  const clearField = () => {
    setCustomer(undefined)
  }

  const back = () => {
    const customerRole = decodedToken.role;
    if (customerRole == "ADMIN")
      nagigator("/admin")
    else if (customerRole == "USER")
      nagigator("/user")
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

  const formatDate = (dateString: any) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  };

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

  useEffect(() => {
    findAllImageByCustomerlId(userId);
  }, []);

  useEffect(() => {
    getCustomerById()
    clearField()
  }, [userId])

  return (
    <>
      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h2>Hồ Sơ Của Tôi</h2>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          <Form layout="vertical" style={{ marginTop: 80 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Email">
                  <Input
                    value={customer?.email}
                    onChange={(e) => handleChangeSingleField("email")(e.target.value)}
                    disabled
                  />
                </Form.Item>

                <Form.Item label="Password" required style={{ display: 'none' }}>
                  <Input
                    value={customer?.password}
                    onChange={(e) => handleChangeSingleField("password")(e.target.value)}
                    disabled
                    type='password'
                  />
                </Form.Item>

                <Form.Item label="Name">
                  <Input
                    value={customer?.name}
                    onChange={(e) => handleChangeSingleField("name")(e.target.value)}
                  />
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

                <Form.Item label="Birthday">
                  <Input
                    type="date"
                    value={customer?.birthday}
                    onChange={(e) => handleBirthdayChange(e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="Age">
                  <Input
                    value={customer?.age}
                    type="number"
                    disabled
                  />
                </Form.Item>


              </Col>

              <Col span={12}>

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

                <Form.Item label="Location">
                  <Input
                    value={customer?.location}
                    onChange={(e) => handleChangeSingleField("location")(e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="Create Date">
                  <Input
                    value={formatDate(customer?.createDate)}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="Update Date">
                  <Input
                    value={formatDate(customer?.updateDate)}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{ marginLeft: 260 }}>
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

        <div style={{ textAlign: 'center', position: 'relative', top: '180px', marginLeft: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {imageUrl && (
            <div style={{ marginBottom: 16 }}>
              <img
                src={imageUrl}
                alt="Preview"
                style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: "50%", marginLeft: 50 }}
              />
            </div>
          )}
          <label style={{ display: 'inline-block', backgroundColor: '#ffff', border: "1px solid black", color: 'black', padding: '8px 16px', cursor: 'pointer', borderRadius: '30px', marginLeft: 55 }}>
            Thay đổi ảnh
            <input type="file" onChange={onFileChange} style={{ display: 'none' }} />
          </label>
        </div>

      </div>
    </>
  );

}

export default Profile