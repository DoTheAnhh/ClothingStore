import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React from 'react';
import UserPageHeader from './UserPageHeader';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  lineHeight: '64px',
  backgroundColor: '#ffff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  flex: 1, // Giúp content chiếm hết không gian còn lại
  color: '#fff',
  backgroundColor: '#0958d9',
  display: 'flex', // Flexbox để căn giữa nội dung
  justifyContent: 'center',
  alignItems: 'center',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
};

const LayoutUser: React.FC = () => {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <UserPageHeader />
      </Header>
      <Content style={contentStyle}>Content</Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
};

export default LayoutUser;
