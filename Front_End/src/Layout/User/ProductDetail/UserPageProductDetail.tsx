import React, { useEffect, useState } from 'react';
import UserPageHeader from '../Header/UserPageHeader';
import { Button, Carousel, InputNumber } from 'antd';
import { ProductResponse } from '../../../Interface/interface';
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../APIs/API';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './css/index.css'

const UserPageProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductResponse | undefined>(undefined);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const handleQuantityChange = (value: number | null) => {
        if (value) setQuantity(value);
    };

    const handleSizeClick = (size: string) => {
        setSelectedSize(size);
    };

    const handleColorClick = (color: string) => {
        setSelectedColor(color);
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
                                        {product.colors.map(color => (
                                            <Button
                                                key={color}
                                                onClick={() => handleColorClick(color)}
                                                style={{
                                                    margin: '0 10px',
                                                    backgroundColor: selectedColor === color ? 'black' : 'white',
                                                    color: selectedColor === color ? 'white' : 'black',
                                                }}
                                            >
                                                {color}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginTop: 30 }}>
                                    Kích thước:
                                    <div style={{ marginTop: 10 }}>
                                        {product.sizes.map(size => (
                                            <Button
                                                key={size}
                                                onClick={() => handleSizeClick(size)}
                                                style={{
                                                    margin: '0 10px',
                                                    backgroundColor: selectedSize === size ? 'black' : 'white',
                                                    color: selectedSize === size ? 'white' : 'black',
                                                }}
                                            >
                                                {size}
                                            </Button>
                                        ))}
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
                                    <Button style={{ backgroundColor: 'black', color: 'white', height: 50, width: 170, fontSize: 16, fontWeight: 'bold' }}>Thêm vào giỏ hàng</Button>
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
