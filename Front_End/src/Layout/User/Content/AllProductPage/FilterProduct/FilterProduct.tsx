import { MoreOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { ProductResponse, TypeResponse } from '../../../../../Interface/interface';
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../../../APIs/API';
import axios from 'axios';

interface FilterProductProps {
    onTypeChange: (text: string) => void;
    setProducts: React.Dispatch<React.SetStateAction<ProductResponse[]>>;
}

const FilterProduct: React.FC<FilterProductProps> = ({ onTypeChange, setProducts }) => {

    const [types, setTypes] = useState<TypeResponse[]>([])

    const findAllType = async () => {
        const res = await axios.get(LOCALHOST + MAPPING_URL.TYPE + API_URL.TYPE.FIND_ALL_TYPE)
        setTypes(res.data)
    }

    const handleClick = (text: string, typeId?: number) => {
        onTypeChange(text);

        if (text === 'Tất cả sản phẩm') {
            findAllProduct();
        } else if (typeId) {
            findAllProductsByType(typeId);
        }
    };

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

    const findAllProductsByType = async (typeId: number) => {
        try {
            const res = await axios.get(
                `${LOCALHOST}${MAPPING_URL.PRODUCT}${API_URL.PRODUCT.FIND_PRODUCT_BY_TYPE_ID}/${typeId}`
            );
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        findAllProduct()
        findAllType()
    }, [])

    return (
        <>
            <div style={{ width: 150 }}>
                <div style={{ fontSize: 26, fontWeight: 'bold', marginTop: 10 }}>
                    <MoreOutlined /> Thể loại
                </div>
                <ul style={{ marginLeft: "4vh" }}>
                    <li style={{ padding: '3vh 0 1vh 0' }}>
                        <a style={{ color: 'black' }} onClick={() => handleClick('Tất cả sản phẩm')}>Tất cả sản phẩm</a>
                    </li>
                    {types.map((type) => (
                        <li key={type.id} style={{ padding: '1vh 0' }}>
                        <a style={{ color: 'black' }} onClick={() => handleClick(type.typeName, type.id)}>{type.typeName}</a>
                    </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default FilterProduct;
