import { DashboardOutlined, ProductFilled, UserOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const MenuBar: React.FC = () => {

  const navigator = useNavigate()

  const items: MenuProps['items'] = [
    { label: 'Dash board', key: '/admin/dash-board', icon: <DashboardOutlined />},
    { label: 'Product detail', key: '/admin/product-details', icon: <ProductFilled /> },
    { label: 'Customer', key: '/admin/customers', icon: <UserOutlined /> },
  ];

  return (
    <>
      <Menu
        onClick={({ key }) => {
          if (key === 'sign-out') {
            // Xử lý đăng xuất
          } else {
            navigator(key);
          }
        }}
        items={items}
      />
    </>
  );
}

export default MenuBar