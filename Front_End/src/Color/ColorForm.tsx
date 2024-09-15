import React, { useCallback, useEffect, useState } from 'react'
import { ColorRequest } from '../Interface/interface';
import axios from 'axios';
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API';
import { Button, Col, Form, Input, Popconfirm, Row } from 'antd';

interface ColorProps {
    handleCancelColorModal: () => void;
    selectedColor: number | null;
}

const ColorForm: React.FC<ColorProps> = ({ handleCancelColorModal, selectedColor }) => {

    const [color, setColor] = useState<ColorRequest>()

    const findColorById = async () => {
        try {
            if (selectedColor) {
                const res = await axios.get(
                    LOCALHOST + MAPPING_URL.COLOR + API_URL.COLOR.FIND_ALL_COLOR + `/${selectedColor}`
                )
                setColor(res.data)
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleChangeSingleField = useCallback(
        (field: string) => {
            return (value: string | number) => {
                setColor((prev) => ({
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
            
            if (selectedColor) {
                await axios.put(LOCALHOST + MAPPING_URL.COLOR + API_URL.COLOR.EDIT + `/${selectedColor}`, color, config);
            } else {
                await axios.post(LOCALHOST + MAPPING_URL.COLOR + API_URL.COLOR.INSERT, color, config)
            }
            handleCancelColorModal()
        } catch (e) {
            console.error(e);
        }
    }

    const clearField = () => {
        setColor(undefined)
    }

    useEffect(() => {
        findColorById()
        clearField()
    }, [selectedColor])

    return (
        <Form layout="vertical">
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Color" required>
                        <Input
                            value={color?.colorName}
                            onChange={(e) => handleChangeSingleField("colorName")(e.target.value)}
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

export default ColorForm