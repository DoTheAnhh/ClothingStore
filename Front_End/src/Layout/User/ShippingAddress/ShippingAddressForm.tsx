import React, { useCallback, useEffect, useState } from 'react'
import { ShippingAddressRequest } from '../../../Interface/interface'
import axios from 'axios';
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../APIs/API';
import { toast } from 'react-toastify';
import { Button, Col, Form, Input, Popconfirm, Row } from 'antd';

interface ShippingAddressFormProps {
    handleCancelShippingAddressModal: () => void;
    selectedShippingAddress: number | null;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ handleCancelShippingAddressModal, selectedShippingAddress }) => {

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

    const [shippingAddress, setShippingAddress] = useState<ShippingAddressRequest>({
        userName: '',
        phoneNumber: '',
        provinceName: '',
        districtName: '',
        wardName: '',
        addressDetail: '',
        customerId: userId,
    });

    const findShippingAddressById = async () => {
        try {
            if (selectedShippingAddress) {
                const res = await axios.get(LOCALHOST + MAPPING_URL.SHIPPING_ADDRESS + API_URL.SHIPPING_ADDRESS.FIND_ALL_SHIPPING_ADDRESS + `/${selectedShippingAddress}`)
                setShippingAddress(res.data)
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleChangeSingleField = useCallback(
        (field: string) => {
            return (value: string | number) => {
                setShippingAddress((prev) => ({
                    ...prev,
                    [field]: value,
                }));
            };
        },
        []
    );

    const handleInsertOrUpdate = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            if (selectedShippingAddress) {
                await axios.put(LOCALHOST + MAPPING_URL.SHIPPING_ADDRESS + API_URL.SHIPPING_ADDRESS.EDIT + `/${selectedShippingAddress}`, shippingAddress, config);
                toast.success('Updated shipping address successfully', {
                    autoClose: 5000,
                })
            } else {
                await axios.post(LOCALHOST + MAPPING_URL.SHIPPING_ADDRESS + API_URL.SHIPPING_ADDRESS.INSERT, shippingAddress, config)
                toast.success('Insert shipping address successfully', {
                    autoClose: 5000,
                })
            }
            handleCancelShippingAddressModal()
        } catch (e) {
            toast.error("Error insert/update", {
                autoClose: 5000,
            })
        }
    }

    const clearField = () => {
        setShippingAddress({
            userName: '',
            phoneNumber: '',
            provinceName: '',
            districtName: '',
            wardName: '',
            addressDetail: '',
            customerId: userId,
        })
    }

    useEffect(() => {
        clearField()
        findShippingAddressById()
    }, [selectedShippingAddress])

    return (
        <Form layout="vertical">
            <Row style={{ width: '650px' }}>
                <Col span={8}>
                    <Form.Item label="User name" required>
                        <Input
                            value={shippingAddress?.userName}
                            onChange={(e) => handleChangeSingleField("userName")(e.target.value)}
                        />
                    </Form.Item>
                </Col>
                <Col span={8} style={{ marginLeft: '6vh' }}>
                    <Form.Item label="Phone number" required>
                        <Input
                            value={shippingAddress?.phoneNumber}
                            onChange={(e) => handleChangeSingleField("phoneNumber")(e.target.value)}
                        />
                    </Form.Item>
                </Col>

            </Row>

            <Row gutter={25}>
                <Col span={8}>
                    <Form.Item label="Province name" required>
                        <Input
                            value={shippingAddress?.provinceName}
                            onChange={(e) => handleChangeSingleField("provinceName")(e.target.value)}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="District name" required>
                        <Input
                            value={shippingAddress?.districtName}
                            onChange={(e) => handleChangeSingleField("districtName")(e.target.value)}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Ward name" required>
                        <Input
                            value={shippingAddress?.wardName}
                            onChange={(e) => handleChangeSingleField("wardName")(e.target.value)}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row style={{ width: '650px' }}>
                <Col style={{ width: '470px' }}>
                    <Form.Item label="Address detail" required>
                        <Input
                            value={shippingAddress?.addressDetail}
                            onChange={(e) => handleChangeSingleField("addressDetail")(e.target.value)}
                            style={{ height: '80px', resize: 'none' }}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item style={{ marginLeft: '55vh' }}>
                <Popconfirm
                    title="Are you sure you want to submit?"
                    onConfirm={() => handleInsertOrUpdate()}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary">Hoàn thành</Button>
                </Popconfirm>
            </Form.Item>
        </Form>
    )
}

export default ShippingAddressForm