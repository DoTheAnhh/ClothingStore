import React, { useCallback, useEffect, useState } from 'react'
import { BrandResponse, ProductRequest, TypeResponse } from '../Interface/interface';
import axios from 'axios';
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API';
import { Button, Col, Form, Input, Modal, Popconfirm, Row, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ListType from '../Type/ListType';
import ListBrand from '../Brand/ListBrand';

interface ProductProps {
    handleCancelProductModal: () => void;
    selectedProduct: number | null;
}

const ProductForm: React.FC<ProductProps> = ({ handleCancelProductModal, selectedProduct }) => {

    const [product, setProduct] = useState<ProductRequest>()
    const [types, setTypes] = useState<TypeResponse[]>([]);
    const [brands, setBrands] = useState<BrandResponse[]>([]);

    const [isOpenModalType, setIsOpenModalType] = useState(false);
    const [isOpenModalBrand, setIsOpenModalBrand] = useState(false);

    const showModalType = useCallback(() => {
        setIsOpenModalType(true);
    }, []);

    const handleCancelTypeModal = useCallback(() => {
        setIsOpenModalType(false);
        findAllType();
    }, []);

    const showModalBrand = useCallback(() => {
        setIsOpenModalBrand(true);
    }, []);

    const handleCancelBrandModal = useCallback(() => {
        setIsOpenModalBrand(false);
        findAllBrand();
    }, []);

    const findProductById = async () => {
        try {
            if (selectedProduct) {
                const res = await axios.get(
                    LOCALHOST + MAPPING_URL.PRODUCT + API_URL.PRODUCT.FIND_ALL_PRODUCT + `/${selectedProduct}`
                )
                const data = res.data;
                setProduct({
                    productCode: data.productCode,
                    productName: data.productName,
                    productPrice: data.productPrice,
                    productDescription: data.productDescription,
                    typeId: data.typeName,
                    brandId: data.brandName,
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleChangeSingleField = useCallback(
        (field: string) => {
            return (value: string | number) => {
                setProduct((prev) => ({
                    ...prev,
                    [field]: value,
                }));
            };
        },
        []
    );

    const findAllType = async () => {
        const res = await axios.get(LOCALHOST + MAPPING_URL.TYPE + API_URL.TYPE.FIND_ALL_TYPE);
        setTypes(res.data);
    };

    const findAllBrand = async () => {
        const res = await axios.get(LOCALHOST + MAPPING_URL.BRAND + API_URL.BRAND.FIND_ALL_BRAND);
        setBrands(res.data);
    };

    const clearField = () => {
        setProduct(undefined)
    }

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
            const productForInsertOrUpdate = {
                ...product,
                typeId: typeof product?.typeId === 'string' ? types.find(t => t.typeName === product?.typeId)?.id : product?.typeId,
                brandId: typeof product?.brandId === 'string' ? brands.find(b => b.brandName === product?.brandId)?.id : product?.brandId,
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

            const userRole = decodedToken.role;

            if (userRole !== 'ADMIN') {
                console.error('User does not have the required ADMIN role');
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            if (selectedProduct) {
                await axios.put(LOCALHOST + MAPPING_URL.PRODUCT + API_URL.PRODUCT.EDIT + `/${selectedProduct}`, productForInsertOrUpdate, config);
            } else {
                await axios.post(LOCALHOST + MAPPING_URL.PRODUCT + API_URL.PRODUCT.INSERT, productForInsertOrUpdate, config)
            }
            handleCancelProductModal()
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        findAllBrand()
        findAllType()
    }, [])

    useEffect(() => {
        findProductById()
        clearField()
    }, [selectedProduct])

    return (
        <Form layout="vertical">
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Product code" required>
                        <Input
                            value={product?.productCode}
                            onChange={(e) => handleChangeSingleField("productCode")(e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item label="Product name" required>
                        <Input
                            value={product?.productName}
                            onChange={(e) => handleChangeSingleField("productName")(e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item label="Product price" required>
                        <Input
                            value={product?.productPrice}
                            onChange={(e) => handleChangeSingleField("productPrice")(e.target.value)}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Type" required>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Select
                                value={product?.typeId}
                                onChange={handleChangeSingleField("typeId")}
                                placeholder="Select a type"
                                style={{ flex: 1 }}
                            >
                                {types.map(type => (
                                    <Select.Option key={type.id} value={type.id}>
                                        {type.typeName}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Button
                                icon={<PlusOutlined />}
                                style={{ marginLeft: 8 }}
                                onClick={showModalType}
                            />
                            <Modal
                                title="Type"
                                open={isOpenModalType}
                                onCancel={handleCancelTypeModal}
                                footer={null}
                            >
                                <ListType />
                            </Modal>
                        </div>
                    </Form.Item>
                    <Form.Item label="Brand" required>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Select
                                value={product?.brandId}
                                onChange={handleChangeSingleField("brandId")}
                                placeholder="Select a type"
                                style={{ flex: 1 }}
                            >
                                {brands.map(brand => (
                                    <Select.Option key={brand.id} value={brand.id}>
                                        {brand.brandName}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Button
                                icon={<PlusOutlined />}
                                style={{ marginLeft: 8 }}
                                onClick={showModalBrand}
                            />
                            <Modal
                                title="Size"
                                open={isOpenModalBrand}
                                onCancel={handleCancelBrandModal}
                                footer={null}
                            >
                                <ListBrand />
                            </Modal>
                        </div>
                    </Form.Item>
                    <Form.Item label="Product description" required>
                        <Input
                            value={product?.productDescription}
                            onChange={(e) => handleChangeSingleField("productDescription")(e.target.value)}
                        ></Input>
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
        </Form >
    )
}

export default ProductForm