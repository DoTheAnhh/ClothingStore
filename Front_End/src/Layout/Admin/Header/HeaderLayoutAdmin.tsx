import React from 'react'
import './css/HeaderLayoutAdmin.scss'
import { Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const HeaderLayoutAdmin: React.FC = () => {

  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate('/');
    } else if (key === 'changePassword') {
      navigate('/reset-password');
    } else if (key === 'profile') {
      navigate('/admin/account/profile');
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
            <img src="https://down-vn.img.susercontent.com/file/ffb79bec4ee0fddca9d0b0679ab9248d_tn" alt="Image customer" className='img-user' />
          </Dropdown>
        </div>
      </div>
    </>
  )
}

export default HeaderLayoutAdmin