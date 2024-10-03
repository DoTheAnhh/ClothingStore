import React from 'react'
import UserPageHeader from '../Header/UserPageHeader'
import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import CartDetail from './Content/CartDetail';

const Cart: React.FC = () => {

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

    return (
        <>
            <Layout style={layoutStyle}>

                <Header style={headerStyle}>
                    <UserPageHeader />
                </Header>

                <Content style={contentStyle}>
                    <CartDetail />
                </Content>

                <Footer style={footerStyle}>
                </Footer>
            </Layout>
        </>
    )
}

export default Cart