import axios from 'axios';
import React, { useEffect } from 'react';
import { API_URL, LOCALHOST, MAPPING_URL } from '../../../../APIs/API';
import { useNavigate } from 'react-router-dom';

const PaymentReturn: React.FC = () => {

    const navigate = useNavigate();

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
        navigate('/login');
        return;
    }

    const decodedToken = decodeJwt(token);
    if (!decodedToken) {
        console.error('Invalid token');
        return;
    }

    const customerId = decodedToken.id;

    const clearCartAndUpdateProductDetail = async () => {
        await axios.delete(LOCALHOST + MAPPING_URL.CART + API_URL.CART.CLEAR_CART_AND_UPDATE_PRODUCT_QUANTITY + `?customerId=${customerId}`)
    }

    useEffect(() => {
        clearCartAndUpdateProductDetail()
    }, [])

    return (
        <div>
            <h1>Kết quả thanh toán</h1>
        </div>
    );
};

export default PaymentReturn;
