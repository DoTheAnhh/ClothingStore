import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProductResponse } from '../../../../Interface/interface';
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../../APIs/API';

const BestSellingProduct: React.FC = () => {

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
        navigate(`/user/product/${productId}`);
    };

    useEffect(() => {
        findAllProduct();
    }, []);

    return (
        <div id='best-selling-product'>
            <div style={{ color: 'black', fontWeight: 'initial', fontSize: "30px", paddingBottom: '2%' }}>
                Sản phẩm bán chạy nhất
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                marginTop: "2%",
                margin: "0 130px",
                overflow: 'hidden',
            }}>
                {products
                    .slice(0, 4)
                    .sort(() => Math.random() - 0.5)
                    .map((product) => (
                        <div className="product-card" key={product.id} style={{
                            flex: '0 0 calc(25% - 20px)',
                            margin: '0 10px',
                            minHeight: '400px',
                            boxSizing: 'border-box',
                            position: 'relative',
                            marginBottom: "8%",
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
                            <div style={{
                                color: 'black',
                                marginTop: 10,
                                fontSize: 15,
                                fontWeight: 'bolder',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                WebkitLineClamp: 2,
                                height: '40px',
                            }}>
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
            </div>
        </div >
    )
}

export default BestSellingProduct