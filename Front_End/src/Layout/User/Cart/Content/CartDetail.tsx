import { Button, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../../APIs/API';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';
import { CartResponse } from '../../../../Interface/interface';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CartDetail: React.FC<{ setCountProduct: (count: number) => void }> = ({ setCountProduct }) => {

    const [carts, setCarts] = useState<CartResponse[]>([])

    const navigate = useNavigate();

    const countProductsInCart = async () => {
        const res = await axios.get(LOCALHOST + MAPPING_URL.CART + API_URL.CART.COUNT + `?customerId=${customerId}`);
        const productCount = res.data;
        setCountProduct(productCount);
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
        navigate('/login');
        return;
    }

    const decodedToken = decodeJwt(token);
    if (!decodedToken) {
        console.error('Invalid token');
        return;
    }

    const customerId = decodedToken.id;

    const findAllCart = async () => {
        const res = await axios.get(LOCALHOST + MAPPING_URL.CART + API_URL.CART.FIND_ALL_CART + `?customerId=${customerId}`);
        setCarts(res.data);
    }

    const updateProductQuantityInCart = async (productDetailId: number, quantity: number) => {
        if (quantity < 1) {
            toast.error("Số lượng phải lớn hơn hoặc bằng 1");
            return; // Dừng hàm nếu số lượng không hợp lệ
        }

        try {
            await axios.put(`${LOCALHOST}${MAPPING_URL.CART}${API_URL.CART.UPDATE_PRODUCT_QUANTITY_IN_CART}?productDetailId=${productDetailId}&quantity=${quantity}`);

            setCarts(prevCarts =>
                prevCarts.map(cartItem =>
                    cartItem.productDetailId === productDetailId ? { ...cartItem, quantity } : cartItem
                )
            );

            // Gọi hàm findAllCart để làm mới giỏ hàng sau khi cập nhật
            findAllCart();
        } catch (error) {
            // Kiểm tra xem lỗi có phản hồi từ server hay không
            if (axios.isAxiosError(error) && error.response) {
                // Hiển thị thông báo lỗi từ server
                toast.error(error.response.data || "Đã xảy ra lỗi khi cập nhật số lượng sản phẩm.");
            } else {
                // Hiển thị thông báo lỗi chung
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
            }
        }
    };

    const deleteProductQuantityInCart = async (id: number) => {
        await axios.delete(`${LOCALHOST}${MAPPING_URL.CART}${API_URL.CART.DELETE_PRODUCT_QUANTITY_IN_CART}/${id}`);
        findAllCart();
        countProductsInCart()
    }

    const nextToPayment = () => {
        navigate('/payment')
    }

    useEffect(() => {
        findAllCart()
        countProductsInCart()
    }, [])

    const totalAmount = carts.reduce((total, cartItem) => total + cartItem.totalPrice, 0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '4vw', marginTop: '5vh' }}>
            <div style={{ fontSize: 20, marginBottom: '5vh', marginLeft: '-7vh' }}>
                Giỏ hàng của bạn
            </div>

            <div style={{ border: '1px solid rgba(128, 128, 128, 0.5)', padding: '10px', marginLeft: '16vh', width: "80%" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bolder', fontSize: 15, borderBottom: '1px solid rgba(128, 128, 128, 0.5)', paddingBottom: '1.5vh' }}>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, flex: '1' }}>
                        <li style={{ float: 'left' }}>Thông tin sản phẩm</li>
                    </ul>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', justifyContent: 'space-between', flex: '1', marginRight: '11vh' }}>
                        <li>Đơn giá</li>
                        <li>Số lượng</li>
                        <li>Thành tiền</li>
                    </ul>
                </div>

                {carts.map((cartItem) => (
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <img
                            style={{ width: "16vh", marginTop: '3vh', marginRight: '-2vh' }}
                            src={cartItem?.imageUrl}
                            alt="Image product"
                        />
                        <div style={{ marginLeft: '-25vh', flex: '1' }}>
                            <div style={{
                                fontWeight: 'bold',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                                height: '10vh',
                                width: '50%',
                                marginLeft: '30vh',
                                marginTop: '2vh',
                                textAlign: 'left',
                            }}>
                                {cartItem.productName}
                            </div>

                            <div style={{ marginLeft: '30vh' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '-3vh' }}>
                                    <div style={{ minWidth: '100px', textAlign: 'left', whiteSpace: 'nowrap' }}>
                                        Màu sắc: {cartItem?.colorName}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1vh' }}>
                                    <div style={{ minWidth: '100px', textAlign: 'left', whiteSpace: 'nowrap' }}>
                                        Kích thước: {cartItem?.sizeName}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul style={{
                            listStyleType: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            justifyContent: 'space-between',
                            flex: '1',
                            marginLeft: '-15vh',
                            width: '50%',
                            flexWrap: 'wrap',
                        }}>
                            <li style={{ color: 'red', flex: '1', textAlign: 'center' }}>
                                {cartItem?.productPrice.toLocaleString("vi-VN")} VND
                            </li>
                            <li style={{ flex: '1', textAlign: 'center', marginLeft: '2vh' }}>
                                <InputNumber
                                    min={1}
                                    max={10}
                                    style={{ width: '40%' }}
                                    value={cartItem?.quantity}
                                    onChange={(value) => updateProductQuantityInCart(cartItem.productDetailId, value!)}
                                />
                            </li>
                            <li style={{ color: 'red', flex: '1', textAlign: 'center', marginLeft: '4vh' }}>
                                {cartItem?.totalPrice.toLocaleString("vi-VN")} VND
                            </li>
                            <li style={{ textAlign: 'center', marginRight: '2vh' }}>
                                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => deleteProductQuantityInCart(cartItem?.cartId)} />
                            </li>
                        </ul>
                    </div>
                ))}
            </div>

            <div style={{ marginLeft: '50vw', marginTop: '3vh', fontSize: '15px', fontWeight: 'bold', alignItems: 'center' }}>
                <div style={{ display: 'flex', marginLeft: '10vw', flexGrow: 1 }}>
                    Tổng tiền:
                    <p style={{ marginLeft: '10vw', marginBottom: 0, color: 'red' }}>{totalAmount.toLocaleString("vi-VN")} VND</p>
                </div>
                <div style={{ marginLeft: '-2vw', marginTop: '2vh' }}>
                    <Button style={{ width: '23vw', background: 'black', color: 'white', padding: '20px 0' }} onClick={nextToPayment}>Thanh toán</Button>
                </div>
            </div>

        </div>
    );
}

export default CartDetail;
