import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Popconfirm, Row, Select } from 'antd';
import axios from 'axios';
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API';
import { ColorResponse, ProductResponse, ProductDetailRequest, SizeResponse, ImageResponse } from '../Interface/interface';
import { PlusOutlined } from '@ant-design/icons';
import ListProduct from '../Product/ListProduct';
import ListSize from '../Size/ListSize';
import ListColor from '../Color/ListColor';
import { toast } from 'react-toastify';


interface ProductDetailProps {
    handleCancelProductDetailModal: () => void;
    selectedProductDetail: number | null;
}

const ProductDetailForm: React.FC<ProductDetailProps> = ({ handleCancelProductDetailModal, selectedProductDetail }) => {
    const [productDetail, setProductDetail] = useState<ProductDetailRequest | undefined>(undefined);
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [sizes, setSizes] = useState<SizeResponse[]>([]);
    const [colors, setColors] = useState<ColorResponse[]>([]);

    const [isOpenModalSize, setIsOpenModalSize] = useState(false);
    const [isOpenModalColor, setIsOpenModalColor] = useState(false);
    const [isOpenModalProduct, setIsOpenModalProduct] = useState(false);

    const showModalSize = useCallback(() => {
        setIsOpenModalSize(true);
    }, []);

    const handleCancelSizeModal = useCallback(() => {
        setIsOpenModalSize(false);
        findAllSize();
    }, []);

    const showModalColor = useCallback(() => {
        setIsOpenModalColor(true);
    }, []);

    const handleCancelColorModal = useCallback(() => {
        setIsOpenModalColor(false);
        findAllColor();
    }, []);

    const showModalProduct = useCallback(() => {
        setIsOpenModalProduct(true);
    }, []);

    const handleCancelProductModal = useCallback(() => {
        setIsOpenModalProduct(false);
        findAllProduct();
    }, []);

    const uploadImage = async (productDetailId: number, token: string): Promise<string | null> => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('productDetailId', productDetailId.toString());

            try {
                const response = await axios.post(
                    `${LOCALHOST}${MAPPING_URL.IMAGE}${API_URL.IMAGE.UPLOAD}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`, // Thêm token vào headers
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


    const findProductDetailById = async () => {
        try {
            if (selectedProductDetail) {
                const res = await axios.get(
                    LOCALHOST + MAPPING_URL.PRODUCT_DETAIL + API_URL.PRODUCT_DETAIL.FIND_ALL_PRODUCT_DETAIL + `/${selectedProductDetail}`
                );
                const data = res.data;
                setProductDetail({
                    id: data.id,
                    quantity: data.quantity,
                    productId: data.productName,
                    sizeId: data.sizeName,
                    productPrice: data.productPrice,
                    colorId: data.colorName,
                    qrcode: data.qrcode,
                    status: data.status,
                });

                await findAllImageByProductDetailId(data.id);
            }
        } catch (error) {
            console.error('Error fetching product detail:', error);
        }

    };

    const findAllImageByProductDetailId = async (productDetailId: number) => {
        try {
            const url = `${LOCALHOST}${MAPPING_URL.IMAGE}${API_URL.IMAGE.FIND_IMAGE_BY_PRODUCT_DETAIL_ID}/${productDetailId}`;
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
            const productDetailForInsertOrUpdate = {
                ...productDetail,
                status: true,
                productId: typeof productDetail?.productId === 'string' ? products.find(p => p.productName === productDetail?.productId)?.id : productDetail?.productId,
                sizeId: typeof productDetail?.sizeId === 'string' ? sizes.find(s => s.sizeName === productDetail?.sizeId)?.id : productDetail?.sizeId,
                colorId: typeof productDetail?.colorId === 'string' ? colors.find(c => c.colorName === productDetail?.colorId)?.id : productDetail?.colorId,
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

            if (selectedProductDetail) {
                await axios.put(
                    LOCALHOST + MAPPING_URL.PRODUCT_DETAIL + API_URL.PRODUCT_DETAIL.UPDATE_PRODUCT_DETAIL + `/${selectedProductDetail}`,
                    productDetailForInsertOrUpdate,
                    config
                );
                toast.success('Updated product detail successfully', {
                    autoClose: 5000,
                })
                id = selectedProductDetail;
            } else {
                const response = await axios.post(
                    LOCALHOST + MAPPING_URL.PRODUCT_DETAIL + API_URL.PRODUCT_DETAIL.INSERT_PRODUCT_DETAIL,
                    productDetailForInsertOrUpdate,
                    config
                );
                toast.success('Insert product detail successfully', {
                    autoClose: 5000,
                })
                id = response.data;
            }

            await uploadImage(id, token);

            const qrCodeResponse = await axios.get(
                `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`,
                { responseType: 'blob' }
            );

            const reader = new FileReader();
            reader.readAsDataURL(qrCodeResponse.data);
            reader.onloadend = async () => {
                const base64data = reader.result as string;

                await axios.put(
                    LOCALHOST + MAPPING_URL.PRODUCT_DETAIL + API_URL.PRODUCT_DETAIL.UPDATE_QR_CODE,
                    { id, qrcode: base64data },
                    config
                );

                setProductDetail((prev) => prev ? { ...prev, qrcode: base64data } : undefined);
                handleCancelProductDetailModal();
            };
            clearField()    
        } catch (error) {
            toast.error("Error insert/update", {
                autoClose: 5000,
            })
        }
    };

    const findAllColor = async () => {
        const res = await axios.get(LOCALHOST + MAPPING_URL.COLOR + API_URL.COLOR.FIND_ALL_COLOR);
        setColors(res.data);
    };

    const findAllProduct = async () => {
        const res = await axios.get(LOCALHOST + MAPPING_URL.PRODUCT + API_URL.PRODUCT.FIND_ALL_PRODUCT);
        setProducts(res.data);
    };

    const findAllSize = async () => {
        const res = await axios.get(LOCALHOST + MAPPING_URL.SIZE + API_URL.SIZE.FIND_ALL_SIZE);
        setSizes(res.data);
    };

    const handleChangeSingleField = useCallback(
        (field: string) => {
            return (value: string | number) => {
                setProductDetail((prev) => ({
                    ...prev,
                    [field]: value,
                }));
            };
        },
        []
    );

    const clearField = () => {
        setImageUrl(null)
        setProductDetail(undefined)
    }

    useEffect(() => {
        findAllColor();
        findAllProduct();
        findAllSize();
        setImageUrl(null);
    }, []);

    useEffect(() => {
        findProductDetailById();
        clearField()
    }, [selectedProductDetail])

    return (
        <Form layout="vertical">
            <Row gutter={55}>
                <Col span={12}>
                    <Form.Item label="Product" required>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Select
                                value={productDetail?.productId}
                                onChange={handleChangeSingleField("productId")}
                                placeholder="Select a product"
                                style={{ flex: 1 }}
                            >
                                {products.map(product => (
                                    <Select.Option key={product.id} value={product.id}>
                                        {product.productName}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Button
                                icon={<PlusOutlined />}
                                style={{ marginLeft: 8 }}
                                onClick={showModalProduct}
                            />
                            <Modal
                                title="Product"
                                open={isOpenModalProduct}
                                onCancel={handleCancelProductModal}
                                footer={null}
                                width={1200}
                            >
                                <ListProduct />
                            </Modal>
                        </div>
                    </Form.Item>
                    <Form.Item label="Size" required>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Select
                                value={productDetail?.sizeId}
                                onChange={handleChangeSingleField("sizeId")}
                                placeholder="Select a size"
                                style={{ flex: 1 }}
                            >
                                {sizes.map(size => (
                                    <Select.Option key={size.id} value={size.id}>
                                        {size.sizeName}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Button
                                icon={<PlusOutlined />}
                                style={{ marginLeft: 8 }}
                                onClick={showModalSize}
                            />
                            <Modal
                                title="Size"
                                open={isOpenModalSize}
                                onCancel={handleCancelSizeModal}
                                footer={null}
                            >
                                <ListSize />
                            </Modal>
                        </div>
                    </Form.Item>
                    <Form.Item label="Color" required>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Select
                                value={productDetail?.colorId}
                                onChange={handleChangeSingleField("colorId")}
                                placeholder="Select a color"
                                style={{ flex: 1 }}
                            >
                                {colors.map(color => (
                                    <Select.Option key={color.id} value={color.id}>
                                        {color.colorName}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Button
                                icon={<PlusOutlined />}
                                style={{ marginLeft: 8 }}
                                onClick={showModalColor}
                            />
                            <Modal
                                title="Color"
                                open={isOpenModalColor}
                                onCancel={handleCancelColorModal}
                                footer={null}
                            >
                                <ListColor />
                            </Modal>
                        </div>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Quantity" required>
                        <Input
                            type="number"
                            value={productDetail?.quantity}
                            onChange={(e) => handleChangeSingleField("quantity")(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Product price" required>
                        <Input
                            value={productDetail?.productPrice}
                            onChange={(e) => handleChangeSingleField("productPrice")(e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item label="Image" required>
                        <Input type='file' onChange={onFileChange} />
                        {imageUrl && (
                            <div style={{ marginTop: 16 }}>
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    style={{ width: 200, height: 220, objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </Form.Item>
                </Col>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <Form.Item>
                        <Popconfirm
                            title="Are you sure you want to submit this product detail?"
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
    );
};

export default ProductDetailForm;
