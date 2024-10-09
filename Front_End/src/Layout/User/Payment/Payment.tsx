import { EnvironmentOutlined, TagOutlined } from '@ant-design/icons'
import { Layout, Modal } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import UserPageFooter from '../Footer/UserPageFooter'
import axios from 'axios'
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../APIs/API'
import { CartResponse, ShippingAddressResponse } from '../../../Interface/interface'
import { useLocation, useNavigate } from 'react-router-dom'
import ListShippingAddress from '../ShippingAddress/ListShippingAddress'

const Payment: React.FC = () => {

    const location = useLocation();

    const [carts, setCarts] = useState<CartResponse[]>([])

    const selectedAddress = location.state?.selectedAddress ?? 1;

    const [shippingAddress, setShippingAddress] = useState<ShippingAddressResponse>()

    const [isModalChangeLocation, setIsModalChangeLocation] = useState(false);

    const showModal = () => {
        setIsModalChangeLocation(true);
    };

    const handleCancel = () => {
        setIsModalChangeLocation(false);
    };

    const findShippingAddressById = async () => {
        const res = await axios.get(LOCALHOST + MAPPING_URL.SHIPPING_ADDRESS + API_URL.SHIPPING_ADDRESS.FIND_ALL_SHIPPING_ADDRESS + `/${selectedAddress}`)
        setShippingAddress(res.data)
    }

    const navigate = useNavigate();

    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: 'black',
        height: 100,
        lineHeight: '64px',
        backgroundColor: 'white',
    };

    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        flex: 1,
        color: '#000',
        padding: '20px 0',
        backgroundColor: '#F5F5F5',
    };

    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4096ff',
        position: 'relative',
        bottom: -22,
        width: '100%',
    };

    const layoutStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
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

    useEffect(() => {
        findAllCart()
        findShippingAddressById()
    }, [])

    useEffect(() => {
        findShippingAddressById()
    }, [selectedAddress])

    const totalAmount = carts.reduce((total, cartItem) => total + cartItem.totalPrice, 0);

    return (
        <>
            <Layout style={layoutStyle}>

                <Header style={headerStyle}>
                    <div style={{ float: 'left', marginLeft: '10vh', display: 'flex', alignItems: 'center' }}>
                        <img src="/src/assets/Do The Anh.jpg" height={100} width={100} /><div style={{ marginLeft: '1vh', fontSize: '18px' }}>| Thanh Toán</div>
                    </div>
                </Header>

                <Content style={contentStyle}>
                    <div style={{ marginLeft: '20vh', backgroundColor: 'white', padding: 20, width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 8 }}>
                                <EnvironmentOutlined style={{ marginRight: '8px', fontWeight: 'bold', fontSize: 20 }} />
                                <span style={{ fontWeight: 'bold', fontSize: 18 }}>Địa chỉ nhận hàng</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '10px' }}>
                                <div style={{ fontWeight: 'bold' }}>
                                    Người nhận: {shippingAddress?.userName} - {shippingAddress?.phoneNumber}
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    Địa chỉ nhận: {shippingAddress?.addressDetail}, {shippingAddress?.wardName}, {shippingAddress?.districtName}, {shippingAddress?.provinceName}
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            <a onClick={showModal}>Thay đổi</a>
                            <Modal title="Chọn địa chỉ nhận hàng" visible={isModalChangeLocation} footer={false} onCancel={handleCancel}>
                                <ListShippingAddress handleCancel={handleCancel}/>
                            </Modal>
                        </div>
                    </div>

                    <div style={{ marginLeft: '20vh', backgroundColor: 'white', padding: 20, width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2vh', borderRadius: '20px 20px 0 0' , borderBottom: '1px solid black'}}>
                        <div style={{ flex: '0 0 auto'}}>Sản phẩm</div>

                        <ul style={{ display: 'flex', justifyContent: 'space-between', flex: '1', listStyleType: 'none', marginLeft: '30vw' }}>
                            <li style={{ flex: 1, textAlign: 'center' }}>Đơn giá</li>
                            <li style={{ flex: 1, textAlign: 'center' }}>Số lượng</li>
                            <li style={{ flex: 1, textAlign: 'center' }}>Thành tiền</li>
                        </ul>
                    </div>

                    {carts.map((cartItem) => (
                        <div style={{ marginLeft: '20vh', backgroundColor: 'white', padding: 20, width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                            <div style={{ flex: '0 0 auto' }}>
                                <img
                                    style={{ width: "16vh", marginTop: '3vh', marginRight: '-2vh' }}
                                    src={cartItem?.imageUrl}
                                    alt="Image product"
                                />
                            </div>
                            <div style={{ marginLeft: '-25vh', flex: '1' }}>
                                <div style={{
                                    fontWeight: 'bold',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    height: '8vh',
                                    width: '65%',
                                    marginLeft: '30vh',
                                    textAlign: 'left',
                                    marginTop: '2vh'
                                }}>
                                    {cartItem.productName}
                                </div>
                                <div style={{ marginLeft: '30vh', marginTop: '4vh' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '-3vh' }}>
                                        <div style={{ textAlign: 'left' }}>
                                            Màu sắc: {cartItem?.colorName}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1vh' }}>
                                        <div style={{ textAlign: 'left' }}>
                                            Kích thước: {cartItem?.sizeName}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ul style={{ display: 'flex', justifyContent: 'space-between', flex: '1', listStyleType: 'none', marginLeft: '0vw' }}>
                                <li style={{ flex: 1, textAlign: 'center', color: 'red' }}>
                                    {cartItem?.productPrice.toLocaleString("vi-VN")} VND
                                </li>
                                <li style={{ flex: 1, textAlign: 'center' }}>
                                    {cartItem?.quantity}
                                </li>
                                <li style={{ flex: 1, textAlign: 'center', color: 'red' }}>
                                    {cartItem?.totalPrice.toLocaleString("vi-VN")} VND
                                </li>
                            </ul>
                        </div>
                    ))}
                    <div style={{
                        marginLeft: '20vh',
                        backgroundColor: 'white',
                        padding: 20,
                        width: '80%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        borderTop: '1px solid black',
                        borderRadius: '0 0 20px 20px'
                    }}>
                        Tổng tiền:
                        <p style={{ marginLeft: '10vw', marginBottom: 0, color: 'red' }}>
                            {totalAmount.toLocaleString("vi-VN")} VND
                        </p>
                    </div>

                    <div style={{
                        marginLeft: '20vh',
                        backgroundColor: 'white',
                        padding: 20,
                        width: '80%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '2vh',
                        borderRadius: '20px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <TagOutlined style={{ fontSize: '3vh', paddingRight: '1vh' }} />
                            <p style={{ fontWeight: 'bold', fontSize: 18, margin: 0 }}>Voucher</p>
                        </div>
                        <div style={{ fontWeight: 'bold' }}>
                            <a href="">Chọn voucher</a>
                        </div>
                    </div>

                    <div style={{
                        marginLeft: '20vh',
                        backgroundColor: 'white',
                        padding: 20,
                        width: '80%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '2vh',
                        borderBottom: '1px solid black',
                        borderRadius: '20px 20px 0 0'
                    }}>
                        <div style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            margin: 0
                        }}>
                            Phương thức thanh toán
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                        >
                            <div style={{ paddingRight: '10vh' }}>Thanh toán khi nhận hàng</div>
                            <div>
                                <a href="" style={{ fontWeight: 'bold' }}>Thay đổi</a>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        marginLeft: '20vh',
                        backgroundColor: 'white',
                        padding: 20,
                        width: '80%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        borderRadius: '0 0 20px 20px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: "-2vh" }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: 10 }}>
                                <span>Tổng tiền hàng:</span>
                                <span style={{ color: 'red', paddingLeft: "5vw" }}>500.000 VND</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: 10 }}>
                                <span>Phí vận chuyển:</span>
                                <span style={{ color: 'red', paddingLeft: "5vw" }}>0 VND</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: 10 }}>
                                <span>Tổng thanh toán:</span>
                                <span style={{ fontSize: 20, color: 'red', paddingLeft: "5vw" }}>500.000 VND</span>
                            </div>
                        </div>
                    </div>
                </Content>
                <Footer style={footerStyle}>
                    <UserPageFooter />
                </Footer>
            </Layout>
        </>
    )
}

export default Payment