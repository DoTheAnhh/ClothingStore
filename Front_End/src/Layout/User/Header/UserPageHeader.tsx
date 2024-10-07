import { ShoppingCartOutlined } from '@ant-design/icons'
import { Dropdown, Input, Menu } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../APIs/API';
import { ImageResponse } from '../../../Interface/interface';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserPageHeader: React.FC = () => {

    const [loadedImages, setLoadedImages] = useState<number[]>([]);
    const [imageUrl, setImageUrl] = useState<string>('');

    const navigate = useNavigate();

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

    const findAllImageByCustomerId = useCallback(async () => {
        if (!customerId || loadedImages.includes(customerId)) return;

        try {
            const url = `${LOCALHOST}${MAPPING_URL.IMAGE}${API_URL.IMAGE.FIND_IMAGE_BY_CUSTOMER_ID}/${customerId}`;
            const response = await axios.get<ImageResponse[]>(url);
            setLoadedImages((prev) => [...prev, customerId]);

            if (response.data.length > 0) {
                setImageUrl(response.data[0].imageUrl);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }, [customerId, loadedImages]);


    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === 'logout') {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate('/');
        } else if (key === 'changePassword') {
            navigate('/change-password');
        } else if (key === 'profile') {
            navigate('/account/profile');
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="profile">
                Thông tin tài khoản
            </Menu.Item>
            <Menu.Item key="changePassword">
                Đổi mật khẩu
            </Menu.Item>
            <Menu.Item key="logout">
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    const handleCart = () => {
        navigate('/user/cart')
    }

    const handleHome = () => {
        navigate('/user')
    }

    useEffect(() => {
        findAllImageByCustomerId();
    }, [customerId, findAllImageByCustomerId]);

    return (
        <>
            <div className='logo' style={{ justifyContent: 'space-between' }}>
                <img width={110} style={{ marginTop: -10, marginLeft: "5%" }} src="/src/assets/Do The Anh.jpg" alt="Logo" onClick={handleHome} />

                <Input
                    style={{ width: "65vh", marginBottom: -3, marginLeft: "30vh" }}
                    type="text"
                    placeholder='Tìm kiếm sản phẩm ...'
                />
                <ShoppingCartOutlined style={{ fontSize: 30, marginBottom: -3, marginLeft: "20vh", marginRight: "3vh" }} onClick={handleCart} />
                <Dropdown overlay={menu} trigger={['click']}>
                    <img style={{ marginRight: "13vh", width: 50, height: 50, borderRadius: "50%" }} src={imageUrl || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} alt="Image customer" className='img-user' />
                </Dropdown>
            </div>
        </>
    )
}

export default UserPageHeader