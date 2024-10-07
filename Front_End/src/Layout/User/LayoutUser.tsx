import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import UserPageHeader from './Header/UserPageHeader';
import UserPageContent from './Content/UserPageContent';
import UserPageNavbar from './Navbar/UserPageNavbar';
import UserPageFooter from './Footer/UserPageFooter';
import axios from 'axios';
import { API_URL, LOCALHOST, MAPPING_URL } from '../../APIs/API';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 100,
  lineHeight: '64px',
  backgroundColor: '#ffff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  flex: 1,
  color: '#000',
  padding: '20px 0',
  backgroundColor: '#ffff',
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

const LayoutUser: React.FC = () => {

  const [countProduct, setCountProduct] = useState<number>(0);

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

  const countProductsInCart = async () => {
    const res = await axios.get(LOCALHOST + MAPPING_URL.CART + API_URL.CART.COUNT + `?customerId=${userId}`)
    setCountProduct(res.data)
  }

  useEffect(() => {
    countProductsInCart()
  }, [])

  return (
    <Layout style={layoutStyle}>

      <Header style={headerStyle}>
        <UserPageHeader countProductsInCart={countProduct} />
      </Header>

      <UserPageNavbar />

      <Content style={contentStyle}>
        <UserPageContent />
      </Content>

      <Footer style={footerStyle}>
        <UserPageFooter />
      </Footer>
    </Layout>
  );
};

export default LayoutUser;