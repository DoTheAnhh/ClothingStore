import React, { useCallback, useEffect, useState } from 'react';
import './css/HeaderLayoutAdmin.scss';
import { Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../APIs/API';
import { ImageResponse } from '../../../Interface/interface';
import axios from 'axios';

const HeaderLayoutAdmin: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [imageUrl, setImageUrl] = useState<string>(''); // State for image URL

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
    return;
  }

  const decodedToken = decodeJwt(token);
  if (!decodedToken) {
    console.error('Invalid token');
    return;
  }

  const customerId = decodedToken.id;

  const findAllImageByCustomerId = useCallback(async () => {
    try {
      if (customerId && !loadedImages.includes(customerId)) {
        const url = `${LOCALHOST}${MAPPING_URL.IMAGE}${API_URL.IMAGE.FIND_IMAGE_BY_CUSTOMER_ID}/${customerId}`;
        const response = await axios.get<ImageResponse[]>(url);
        setLoadedImages((prev) => [...prev, customerId]);

        if (response.data.length > 0) {
          setImageUrl(response.data[0].imageUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  }, [loadedImages]);

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

  useEffect(() => {
    findAllImageByCustomerId();
  }, []);

  return (
    <>
      <div className='navbar'>
        <div className='logo'>
          <div>
            Do The Anh
          </div>
        </div>
        <div className='user-menu'>
          <Dropdown overlay={menu} trigger={['click']}>
            <img src={imageUrl} alt="Image customer" className='img-user' />
          </Dropdown>
        </div>
      </div>
    </>
  );
}

export default HeaderLayoutAdmin;
