import React, { useEffect } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import './css/index.css';
import axios from 'axios';
import { LOCALHOST } from '../../APIs/API';
import { toast } from 'react-toastify';

const ResetPassword: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [token, setToken] = React.useState<string | null>(null);

    useEffect(() => {
        const tokenn = localStorage.getItem('token')
        setToken(tokenn);
    }, []);

    const onFinish = async (values: { password: string }) => {
        if (!token) {
            toast.error('Token không hợp lệ.', {
                autoClose: 5000,
            })
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(LOCALHOST + '/auth/reset-password', null, {
                params: {
                    token: token,
                    password: values.password,
                }
            });

            if (response.data.statusCode === 200) {
                localStorage.setItem('toastMessage', 'Password reset successful.');
                localStorage.setItem('toastType', 'success');
                window.location.href = '/';
            } else {
                localStorage.setItem('toastMessage', response.data.message || 'An error occurred.');
                localStorage.setItem('toastType', 'error');
            }
        } catch (error) {
            toast.error('An error occurred.', {
                autoClose: 5000,
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            name="reset_password"
            className="reset-password-form"
            onFinish={onFinish}
        >
            <div className="logo-container">
                <img src='/src/assets/Do The Anh.jpg' alt="Logo" className="logo-image" />
            </div>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your new password!' }]}
            >
                <Input.Password placeholder="New Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="reset-password-form-button" loading={loading}>
                    Reset Password
                </Button>
            </Form.Item>
            {loading && (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Spin />
                </div>
            )}
        </Form>
    );
};

export default ResetPassword;
