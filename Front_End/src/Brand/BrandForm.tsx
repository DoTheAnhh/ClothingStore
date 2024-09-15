import React, { useCallback, useEffect, useState } from 'react'
import { BrandRequest } from '../Interface/interface';
import axios from 'axios';
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API';
import { Button, Col, Form, Input, Popconfirm, Row } from 'antd';

interface BrandProps {
    handleCancelBrandModal: () => void;
    selectedBrand: number | null;
}

const BrandForm: React.FC<BrandProps> = ({ handleCancelBrandModal, selectedBrand }) => {

    const [brand, setBrand] = useState<BrandRequest>()

    const findBrandById = async () => {
        try {
            if (selectedBrand) {
                const res = await axios.get(
                    LOCALHOST + MAPPING_URL.BRAND + API_URL.BRAND.FIND_ALL_BRAND + `/${selectedBrand}`
                )
                setBrand(res.data)
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleChangeSingleField = useCallback(
        (field: string) => {
            return (value: string | number) => {
                setBrand((prev) => ({
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
            
            if (selectedBrand) {
                await axios.put(LOCALHOST + MAPPING_URL.BRAND + API_URL.BRAND.EDIT + `/${selectedBrand}`, brand, config);
            } else {
                await axios.post(LOCALHOST + MAPPING_URL.BRAND + API_URL.BRAND.INSERT, brand, config)
            }
            handleCancelBrandModal()
        } catch (e) {
            console.error(e);
        }
    }

    const clearField = () => {
        setBrand(undefined)
    }

    useEffect(() => {
        findBrandById()
        clearField()
    }, [selectedBrand])

    return (
        <Form layout="vertical">
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Brand" required>
                        <Input
                            value={brand?.brandName}
                            onChange={(e) => handleChangeSingleField("brandName")(e.target.value)}
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

export default BrandForm