import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentReturn: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const amount = queryParams.get('vnp_Amount');
        const orderInfo = queryParams.get('vnp_OrderInfo');
        const transactionId = queryParams.get('vnp_TransactionNo');
        const responseCode = queryParams.get('vnp_ResponseCode');
        const transactionStatus = queryParams.get('vnp_TransactionStatus');

        // Xử lý kết quả thanh toán
        if (responseCode === '00' && transactionStatus === '00') {
            // Thanh toán thành công
            console.log('Thanh toán thành công:', { orderInfo, transactionId, amount });
            // Thực hiện hành động sau khi thanh toán thành công
        } else {
            // Thanh toán thất bại
            console.log('Thanh toán thất bại:', { responseCode, transactionStatus });
            // Thực hiện hành động khi thanh toán thất bại
        }
    }, [location]);

    return (
        <div>
            <h1>Kết quả thanh toán</h1>
            {/* Có thể thêm giao diện cho kết quả thanh toán */}
        </div>
    );
};

export default PaymentReturn;
