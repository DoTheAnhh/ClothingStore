import React from 'react';
import { ProductResponse } from '../../../../../Interface/interface';
import { useNavigate } from 'react-router-dom';

interface ShowAllProductProps {
    typeName: string | null;
    products: ProductResponse[];
}

const ShowAllProduct: React.FC<ShowAllProductProps> = ({ typeName, products }) => {

    const navigate = useNavigate()

    const handleProductClick = (productId: number) => {
        navigate(`/user/product-detail/${productId}`);
    };

    return (
        <>
            <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                textAlign: 'center',
                paddingBottom: '5vh',
                marginBottom: '20px',
                marginLeft: '12vh',
            }}>
                {typeName || 'Chưa chọn loại sản phẩm nào'}
            </div>

            <div style={{ width: "136vh" }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    marginLeft: '10vh',
                }}>

                    {products
                        .map((product) => (
                            <div className="product-card" style={{
                                flex: '0 0 calc(25% - 20px)',
                                margin: '0 10px',
                                minHeight: '400px',
                                boxSizing: 'border-box',
                                position: 'relative',
                                marginBottom: -80,
                                overflow: 'hidden',
                            }}>
                                <img
                                    src={product?.imageUrls[0]}
                                    alt="Product image"
                                    style={{
                                        width: '90%',
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
                                    {product?.productName}
                                </div>
                                <div style={{ color: 'black', marginTop: 10, fontSize: 15 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <p style={{ color: "red" }}>
                                            {product.firstProductPrice ? product.firstProductPrice.toLocaleString('vi-VN') : 'N/A'} VND
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default ShowAllProduct;
