import React, { useEffect, useState } from 'react'
import UserPageHeader from '../../Header/UserPageHeader'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { Layout } from 'antd';
import FilterProduct from './FilterProduct/FilterProduct';
import ShowAllProduct from './ShowAllProduct/ShowAllProduct';
import { ProductResponse } from '../../../../Interface/interface';

const AllProductPage: React.FC = () => {

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 100,
    lineHeight: '64px',
    backgroundColor: '#ffff',
  };

  const layoutStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
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

  const [typeName, setTypeName] = useState<string | null>(localStorage.getItem('selectedType'));

  const [products, setProducts] = useState<ProductResponse[]>([]);

  const handleStorageChange = () => {
    const newTypeName = localStorage.getItem('selectedType');
    setTypeName(newTypeName);
  };

  useEffect(() => {
    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleTypeChange = (newType: string) => {
    localStorage.setItem('selectedType', newType);
    setTypeName(newType);
  };

  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <UserPageHeader />
        </Header>

        <Content style={contentStyle}>
          <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '20vh' }}>
            <div style={{ marginRight: '20vh' }}>
              <FilterProduct onTypeChange={handleTypeChange}  setProducts={setProducts} />
            </div>
            <div style={{ marginLeft: '-20vh' }}>
              <ShowAllProduct typeName={typeName} products={products}/>
            </div>
          </div>
        </Content>

        <Footer style={footerStyle}>
        </Footer>
      </Layout>
    </>
  )
}

export default AllProductPage