import React, { useEffect } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import './css/index.css';
import axios from 'axios';
import { LOCALHOST } from '../../APIs/API';
import { toast } from 'react-toastify';

const ChangePassword: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [token, setToken] = React.useState<string | null>(null);

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

    const tok = localStorage.getItem('token');
    if (!tok) {
        console.error('No token found');
        return;
    }

    const decodedToken = decodeJwt(tok);
    if (!decodedToken) {
        console.error('Invalid token');
        return;
    }

    const userEmail = decodedToken.email;

    const onFinish = async (values: { oldPassword: string; password: string; confirmPassword: string }) => {
        if (!token) {
            toast.error('Token không hợp lệ.', {
                autoClose: 5000,
            });
            return;
        }

        setLoading(true);

        try {

            const checkPasswordResponse = await axios.post(LOCALHOST + '/customer/check-password', {
                email: userEmail,
                password: values.oldPassword,
            });

            if (!checkPasswordResponse.data) {
                toast.error('Mật khẩu cũ không chính xác.', {
                    autoClose: 5000,
                });
                return;
            }

            // Nếu mật khẩu cũ chính xác, thực hiện thay đổi mật khẩu
            const response = await axios.post(LOCALHOST + '/auth/reset-password', null, {
                params: {
                    token: token,
                    password: values.password,
                }
            });

            if (response.data.statusCode === 200) {
                localStorage.setItem('toastMessage', 'Password change successful.');
                localStorage.setItem('toastType', 'success');
                window.location.href = '/';
            } else {
                localStorage.setItem('toastMessage', response.data.message || 'An error occurred.');
                localStorage.setItem('toastType', 'error');
            }
        } catch (error) {
            toast.error('An error occurred.', {
                autoClose: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const tokenn = localStorage.getItem('token');
        setToken(tokenn);
    }, []);

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
                name="oldPassword"
                rules={[{ required: true, message: 'Please input your old password!' }]}
            >
                <Input.Password placeholder="Old Password" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your new password!' }]}
            >
                <Input.Password placeholder="New Password" />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                    { required: true, message: 'Please confirm your new password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="Confirm New Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="reset-password-form-button" loading={loading}>
                    Change Password
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

export default ChangePassword;
