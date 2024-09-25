import React, { useCallback, useEffect, useState } from 'react'
import { TypeRequest } from '../Interface/interface';
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API';
import axios from 'axios';
import { Button, Col, Form, Input, Popconfirm, Row } from 'antd';
import { toast } from 'react-toastify';

interface TypeProps {
  handleCancelTypeModal: () => void;
  selectedType: number | null;
}

const TypeForm: React.FC<TypeProps> = ({ handleCancelTypeModal, selectedType }) => {

  const [type, setType] = useState<TypeRequest>()

  const findTypeById = async () => {
    try {
      if (selectedType) {
        const res = await axios.get(
          LOCALHOST + MAPPING_URL.TYPE + API_URL.TYPE.FIND_ALL_TYPE + `/${selectedType}`
        )
        setType(res.data)
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleChangeSingleField = useCallback(
    (field: string) => {
      return (value: string | number) => {
        setType((prev) => ({
          ...prev,
          [field]: value,
        }));
      };
    },
    []
  );

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

      if (selectedType) {
        await axios.put(LOCALHOST + MAPPING_URL.TYPE + API_URL.TYPE.EDIT + `/${selectedType}`, type, config);
        toast.success('Updated type successfully', {
          autoClose: 5000,
        })
      } else {
        await axios.post(LOCALHOST + MAPPING_URL.TYPE + API_URL.TYPE.INSERT, type, config)
        toast.success('Insert type successfully', {
          autoClose: 5000,
        })
      }
      handleCancelTypeModal()
    } catch (e) {
      toast.error("Error insert/update", {
        autoClose: 5000,
      })
    }
  }

  const clearField = () => {
    setType(undefined)
  }

  useEffect(() => {
    findTypeById()
    clearField()
  }, [selectedType])

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Type" required>
            <Input
              value={type?.typeName}
              onChange={(e) => handleChangeSingleField("typeName")(e.target.value)}
            ></Input>
          </Form.Item>
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
        </Col>
      </Row>
    </Form>
  )
}

export default TypeForm