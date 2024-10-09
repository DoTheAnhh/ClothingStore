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

    const [countProduct, setCountProduct] = useState<number>(0);

    const [selectedColorId, setSelectedColorId] = useState<number | null>(null);

    const [selectedProductId, setSelectedProductId] = useState<number>();

    const countProductsInCart = async () => {
        const res = await axios.get(LOCALHOST + MAPPING_URL.CART + API_URL.CART.COUNT + `?customerId=${userId}`)
        setCountProduct(res.data)
    }

    const handleQuantityChange = (value: number | null) => {
        if (value) setQuantity(value);
    };

    const handleSizeClick = async (size: SizeResponse) => {
        setSelectedSize(size.sizeName);
        // Gọi hàm để thêm sản phẩm vào giỏ hàng với kích thước đã chọn và màu sắc hiện tại
        await findProductDetailAddToCart(size.id, selectedColorId);
    };

    const handleColorClick = async (color: ColorResponse) => {
        // Cập nhật màu đã chọn và ID màu
        setSelectedColor(color.colorName);
        setSelectedColorId(color.id);

        // Tìm kiếm kích thước theo ID màu
        const sizes = await findSizesByColorId(color.id);

        // Cập nhật sản phẩm với kích thước mới
        setProduct(prevProduct => ({
            ...prevProduct!,
            sizes: sizes,
        }));

        // Reset kích thước khi chọn màu mới
        setSelectedSize(null);
    };

    const handleOnMouseEnter = async (color: ColorResponse) => {
        const newImageUrls = await findImageByColorIdAndProductId(color.id, id);
        setProduct(prevProduct => ({
            ...prevProduct!,
            imageUrls: [...newImageUrls, ...prevProduct!.imageUrls]
        }));
    }


    const findImageByColorIdAndProductId = async (colorId: number, productId: number) => {
        try {
            const res = await axios.get(LOCALHOST + MAPPING_URL.IMAGE + `/color/${colorId}/product/${productId}`);
            return res.data;
        } catch (err) {
            console.error(err);
        }
    }

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
            countProductsInCart()
            toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
        } catch (error) {
            toast.error('Có lỗi xảy ra! Vui lòng thử lại.');
            console.error('Error adding product to cart:', error);
        }
    };

    const findSizesByColorId = async (colorId: number) => {
        try {
            const res = await axios.get(`${LOCALHOST}${MAPPING_URL.PRODUCT_DETAIL}${API_URL.PRODUCT_DETAIL.FIND_SIZES_ID_BY_COLOR_ID_IN_PRODUCT_DETAIL}/color/${colorId}/product/${id}`);
            return res.data;
        } catch (error) {
            console.error('Error fetching sizes:', error);
            return [];
        }
    };

    useEffect(() => {
        findProductById();
    }, [id]);

    useEffect(() => {
        countProductsInCart()
    }, [])

    return (
        <>
            <div style={{ width: "182vh", marginLeft: '7vh' }}>
                <UserPageHeader countProductsInCart={countProduct} />
            </div>
            <div style={{ display: 'flex' }}>
                {product ? (
                    <>
                        <Carousel style={{ marginLeft: 140, width: 750 }} arrows>
                            {product.imageUrls?.map((imageUrl: string, index: number) => (
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
                                                        onMouseEnter={() => handleOnMouseEnter(color!)}
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
                                        {['S', 'M', 'L', 'XL', 'XXL'].map(sizeName => {
                                            const size = product.sizes.find(s => s.sizeName === sizeName);
                                            const isDisabled = !size;

                                            return (
                                                <Button
                                                    key={sizeName}
                                                    onClick={() => !isDisabled && handleSizeClick(size!)}
                                                    style={{
                                                        margin: '0 10px',
                                                        backgroundColor: selectedSize === sizeName ? 'black' : (isDisabled ? 'lightgray' : 'white'),
                                                        color: selectedSize === sizeName ? 'white' : (isDisabled ? 'darkgray' : 'black'),
                                                        cursor: isDisabled ? 'not-allowed' : 'pointer'
                                                    }}
                                                    disabled={isDisabled}
                                                >
                                                    {sizeName}
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
