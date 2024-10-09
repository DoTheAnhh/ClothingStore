import React, { useEffect, useState } from 'react'
import { ShippingAddressResponse } from '../../../Interface/interface'
import axios from 'axios'
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../APIs/API'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Radio } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ShippingAddressForm from './ShippingAddressForm'

interface ListShippingAddressProps {
  handleCancel: () => void
}

const ListShippingAddress: React.FC<ListShippingAddressProps> = ({ handleCancel }) => {

  const [shippingAddresses, setShippingAddresses] = useState<ShippingAddressResponse[]>([])

  const [selectedAddress, setSelectedAddress] = useState<number>();

  const [selected, setSelected] = useState<number | null>(null);

  const [isModalChangeLocation, setIsModalChangeLocation] = useState(false);

  const handleConfirm = () => {
    handleCancel()
    navigate('', { state: { selectedAddress } });
  };

  const showModal = () => {
    setSelected(null)
    setIsModalChangeLocation(true);
  };

  const showModalById = (shippingAddressId: number) => {
    setSelected(shippingAddressId)
    setIsModalChangeLocation(true);
  };

  const handleCancelAddOrUpdate = () => {
    setIsModalChangeLocation(false);
    setSelected(null);
    findShippingAddressesByCustomerId();
  };

  const handleRadioChange = (e: any) => {
    setSelectedAddress(e.target.value);
  };

  const navigate = useNavigate();

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
    navigate('/login');
    return;
  }

  const decodedToken = decodeJwt(token);
  if (!decodedToken) {
    console.error('Invalid token');
    return;
  }

  const customerId = decodedToken.id;

  const findShippingAddressesByCustomerId = async () => {
    const res = await axios.get(LOCALHOST + MAPPING_URL.SHIPPING_ADDRESS + API_URL.SHIPPING_ADDRESS.FIND_SHIPPING_ADDRESS_BY_CUSTOMER_ID + `/${customerId}`)
    setShippingAddresses(res.data)
  }

  useEffect(() => {
    findShippingAddressesByCustomerId()
  }, [])

  return (
    <>
      <Button
        style={{ marginLeft: '21vw' }}
        onClick={showModal}
      >
        <PlusOutlined />
        Thêm địa chỉ mới
      </Button>
      <Modal visible={isModalChangeLocation} footer={false} onCancel={handleCancelAddOrUpdate}>
        <ShippingAddressForm handleCancelShippingAddressModal={handleCancelAddOrUpdate} selectedShippingAddress={selected} />
      </Modal>
      {shippingAddresses.map((shippingAddress) => {
        return (
          <div key={shippingAddress.shippingAddressId}>
            <div style={{ paddingTop: '10px', fontWeight: 'bold' }}>
              <Radio.Group onChange={handleRadioChange} value={selectedAddress}>
                <Radio value={shippingAddress.shippingAddressId}>
                  {shippingAddress?.userName} | {shippingAddress?.phoneNumber}
                </Radio>
              </Radio.Group>
            </div>
            <div style={{ padding: '10px 0' }}>
              {shippingAddress?.addressDetail}, {shippingAddress?.wardName}, {shippingAddress?.districtName}, {shippingAddress?.provinceName}
            </div>
            <div style={{ padding: '0 0 10px 0', color: '#4096FF' }} onClick={() => showModalById(shippingAddress.shippingAddressId)}>Thay đổi địa chỉ</div>
            <hr />
          </div>
        )
      })}
      <Button style={{ marginTop: '3vh', marginLeft: '21vw' }} onClick={handleCancel}>Hủy</Button>
      <Button type='primary' style={{ marginTop: '3vh', marginLeft: '3vh' }} onClick={handleConfirm}>Xác nhận</Button>
    </>
  )
}

export default ListShippingAddress