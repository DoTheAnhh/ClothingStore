import React, { useCallback, useEffect, useState } from 'react'
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../APIs/API';
import axios from 'axios';
import { ProductResponse } from '../../../Interface/interface';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AllProduct: React.FC = () => {

    const [products, setProducts] = useState<ProductResponse[]>([]);

    const navigate = useNavigate();

    const findAllProduct = useCallback(async (): Promise<void> => {
        try {
            const res = await axios.get(
                `${LOCALHOST}${MAPPING_URL.PRODUCT}${API_URL.PRODUCT.FIND_ALL_PRODUCT}`, {

            });
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleProductClick = (productId: number) => {
        navigate(`/user/product-detail/${productId}`);
    };

    useEffect(() => {
        findAllProduct();
    }, []);

    return (
        <>
            <div style={{ marginTop: 100 }} id='all-product'>
                <div style={{ color: 'black', fontWeight: 'initial', fontSize: "30px", paddingBottom: '20px' }}>
                    Tất cả sản phẩm
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    marginTop: 30,
                    margin: "0 130px",
                    overflow: 'hidden',
                }}>
                    {products
                        .slice(0, 7)
                        .map((product) => (
                            <div className="product-card" key={product.id} style={{
                                flex: '0 0 calc(25% - 20px)',
                                margin: '0 10px',
                                minHeight: '400px',
                                boxSizing: 'border-box',
                                position: 'relative',
                                marginBottom: 50,
                                overflow: 'hidden',
                            }}>
                                <img
                                    src={product.imageUrls[0]}
                                    alt="Product image"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                    }}
                                    onClick={() => handleProductClick(product.id)}
                                />
                                <div style={{ color: 'black', marginTop: 10, fontSize: 15, fontWeight: 'bolder' }}>
                                    {product.productName}
                                </div>
                                <div style={{ color: 'black', marginTop: 10, fontSize: 15 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <p style={{ color: "red" }}>
                                            {product.firstProductPrice ? product.firstProductPrice.toLocaleString('vi-VN') : 'N/A'} VND
                                        </p>
                                    </div>
                                </div>
                                {/* <div className="cart-icon">
                                    <ShoppingCartOutlined style={{ color: "black", fontSize: '18px' }} />
                                </div> */}
                            </div>
                        ))}
                    <div style={{ margin: "120px auto" }}>
                        <a href="" style={{ textDecoration: 'none', color: 'black', fontSize: 20, fontWeight: 'bold' }}>Xem thêm</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllProduct