import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React from 'react';
import UserPageHeader from './Header/UserPageHeader';
import UserPageContent from './Content/UserPageContent';
import UserPageNavbar from './Navbar/UserPageNavbar';
import UserPageFooter from './Footer/UserPageFooter';

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
  return (
    <Layout style={layoutStyle}>

      <Header style={headerStyle}>
        <UserPageHeader />
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