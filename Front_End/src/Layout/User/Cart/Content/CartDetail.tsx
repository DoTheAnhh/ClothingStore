import { InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../../APIs/API';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';
import { CartResponse } from '../../../../Interface/interface';

const CartDetail: React.FC = () => {

    const [quantity, setQuantity] = useState<number>(1);

    const [carts, setCarts] = useState<CartResponse[]>([])

    const findAllCart = async () => {
        const res = await axios.get(LOCALHOST + MAPPING_URL.CART + API_URL.CART.FIND_ALL_CART);
        setCarts(res.data);
    }

    useEffect(() => {
        findAllCart()
    }, [])

    console.log(carts);

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
                            src='https://bizweb.dktcdn.net/thumb/compact/100/415/697/products/1-25d68549-e9a8-4da2-8097-b89d57bbed29.jpg'
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

                            <div style={{ marginLeft: '-18vh', marginTop: '-3vh' }}>Màu sắc: </div>
                            <div style={{ marginLeft: '-16vh' }}>Kích thước: </div>
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
                                200.000 VND
                            </li>
                            <li style={{ flex: '1', textAlign: 'center', marginLeft: '2vh' }}>
                                <InputNumber
                                    min={1}
                                    max={10}
                                    style={{ width: '40%' }}
                                />
                            </li>
                            <li style={{ color: 'red', flex: '1', textAlign: 'center', marginLeft: '4vh' }}>
                                200.000 VND
                            </li>
                            <li style={{ textAlign: 'center', marginRight: '2vh' }}>
                                <DeleteOutlined style={{ cursor: 'pointer' }} />
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CartDetail;
