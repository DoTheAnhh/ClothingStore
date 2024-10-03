import React, { useEffect, useState } from 'react';
import UserPageHeader from '../Header/UserPageHeader';
import { Button, Carousel, InputNumber } from 'antd';
import { ColorResponse, ProductResponse, SizeResponse } from '../../../Interface/interface';
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../APIs/API';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './css/index.css'
import { toast } from 'react-toastify';

const UserPageProductDetail: React.FC = () => {
    const { id } = useParams<{ id: any }>();
    const [product, setProduct] = useState<ProductResponse | undefined>(undefined);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
    const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);

    const [selectedProductId, setSelectedProductId] = useState<number>();

    const handleQuantityChange = (value: number | null) => {
        if (value) setQuantity(value);
    };

    const handleSizeClick = (size: SizeResponse) => {
        setSelectedSize(size.sizeName);
        setSelectedSizeId(size.id);
        findProductDetailAddToCart(size.id, selectedColorId);
    };

    const handleColorClick = (color: ColorResponse) => {
        setSelectedColor(color.colorName);
        setSelectedColorId(color.id);
        findProductDetailAddToCart(selectedSizeId, color.id);
    };

    const findProductById = async () => {
        try {
            if (id) {
                const res = await axios.get(
                    `${LOCALHOST}${MAPPING_URL.PRODUCT}${API_URL.PRODUCT.FIND_ALL_PRODUCT}/${id}`
                );
                setProduct(res.data);
            }
        } catch (error) {
            console.error('Error fetching product detail:', error);
        }
    };

    const findProductDetailAddToCart = async (sizeId: number | null, colorId: number | null) => {
        try {
            if (sizeId && colorId) {
                const res = await axios.post(LOCALHOST + MAPPING_URL.PRODUCT_DETAIL + API_URL.PRODUCT_DETAIL.FIND_PRODUCT_DETAIL_ADD_TO_CART, {
                    colorId: colorId,
                    sizeId: sizeId,
                    productId: id
                });
                setSelectedProductId(res.data);
            }
        } catch (error) {
            console.error('Error fetching product detail for cart:', error);
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

    const handleAddProductDetailToCart = async () => {
        try {
            await axios.post(LOCALHOST + MAPPING_URL.CART + API_URL.CART.ADD_PRODUCT_DETAIL_TO_CART, {
                customerId: userId,
                productDetailId: selectedProductId,
                quantity: quantity,
            });

            toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
        } catch (error) {
            // Hiển thị thông báo lỗi nếu có
            toast.error('Có lỗi xảy ra! Vui lòng thử lại.');
            console.error('Error adding product to cart:', error);
        }
    };

    useEffect(() => {
        findProductById();
    }, [id]);

    return (
        <>
            <UserPageHeader />
            <div style={{ display: 'flex' }}>
                {product ? (
                    <>
                        <Carousel autoplay autoplaySpeed={5000} style={{ marginLeft: 140, width: 750 }} arrows>
                            {product.imageUrls?.map((imageUrl, index) => (
                                <div key={index}>
                                    <img
                                        src={imageUrl}
                                        alt={`Product image ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                        <div style={{ marginLeft: 50, fontSize: 26, fontWeight: 'bold', width: 350, marginTop: 60 }}>
                            {product.productName}
                            <hr style={{ marginTop: 20 }} />
                            <div style={{ display: 'flex', marginTop: 30 }}>
                                <div style={{ fontWeight: 'lighter', color: 'red', paddingRight: 15 }}>
                                    {product.firstProductPrice.toLocaleString("vi-VN")} VND
                                </div>
                                <del style={{ fontSize: '18px', marginTop: 8, fontWeight: 'lighter' }}>{(product.firstProductPrice * 1.25).toLocaleString("vi-VN")} VND</del>
                            </div>
                            <div style={{ fontSize: '18px', marginTop: 25, fontWeight: 'bold' }}>
                                <div style={{ marginTop: 30 }}>
                                    Màu sắc:
                                    <div style={{ marginTop: 10 }}>
                                        {Array.from(new Set(product.colors.map(color => color.colorName)))
                                            .map(colorName => {
                                                const color = product.colors.find(c => c.colorName === colorName);
                                                return (
                                                    <Button
                                                        key={color?.id}
                                                        onClick={() => handleColorClick(color!)}
                                                        style={{
                                                            margin: '0 10px',
                                                            backgroundColor: selectedColor === color?.colorName ? 'black' : 'white',
                                                            color: selectedColor === color?.colorName ? 'white' : 'black',
                                                        }}
                                                    >
                                                        {color?.colorName}
                                                    </Button>
                                                );
                                            })}
                                    </div>
                                </div>

                                <div style={{ marginTop: 30 }}>
                                    Kích thước:
                                    <div style={{ marginTop: 10 }}>
                                        {Array.from(new Set(product.sizes.map(size => size.sizeName)))
                                            .map(sizeName => {
                                                const size = product.sizes.find(s => s.sizeName === sizeName);
                                                return (
                                                    <Button
                                                        key={size?.id}
                                                        onClick={() => handleSizeClick(size!)}
                                                        style={{
                                                            margin: '0 10px',
                                                            backgroundColor: selectedSize === size?.sizeName ? 'black' : 'white',
                                                            color: selectedSize === size?.sizeName ? 'white' : 'black',
                                                        }}
                                                    >
                                                        {size?.sizeName}
                                                    </Button>
                                                );
                                            })}

                                    </div>
                                </div>

                                <div style={{ marginTop: 30, display: 'flex', alignItems: 'center' }}>
                                    <div style={{ marginRight: 25 }}>Số lượng:</div>
                                    <InputNumber
                                        min={1}
                                        max={10}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                    />
                                </div>


                                <div style={{ marginTop: 80, display: 'flex' }}>
                                    <Button style={{ backgroundColor: 'black', color: 'white', height: 50, width: 170, fontSize: 16, fontWeight: 'bold' }} onClick={handleAddProductDetailToCart}>Thêm vào giỏ hàng</Button>
                                    <Button style={{ backgroundColor: 'black', color: 'white', height: 50, width: 170, fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>Mua ngay</Button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div style={{ marginLeft: 140, fontSize: 24 }}>Đang tải thông tin sản phẩm...</div>
                )}
            </div>
        </>
    );
}

export default UserPageProductDetail;
