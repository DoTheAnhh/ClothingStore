import React, { useCallback, useEffect, useState } from 'react';
import { ProductDetailResponse } from '../Interface/interface';
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API';
import axios from 'axios';
import Table, { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { Button, Modal } from 'antd';
import ProductDetail from './ProductDetailForm';
import { EditOutlined } from '@ant-design/icons';
import Pagination from '../Pagination/Pagination';

interface ImageResponse {
    imageUrl: string;
}

const ListProductDetail: React.FC = () => {
    const [productDetails, setProductDetails] = useState<ProductDetailResponse[]>([]);
    const [loadedImages, setLoadedImages] = useState<number[]>([]);

    const [isModalOpenProductDetail, setIsModalProductDetail] = useState(false);
    const [selectedProductDetail, setSelectedProductDetail] = useState<number | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [totalProductDetail, setTotalProductDetail] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        findAllProductDetail(page, pageSize);
    }, [pageSize]);

    const handlePageSizeChange = useCallback((newPageSize: number) => {
        setPageSize(newPageSize);
        setCurrentPage(1);
        findAllProductDetail(1, newPageSize);
    }, []);

    const showModalProductDetail = () => {
        setSelectedProductDetail(null);
        setIsModalProductDetail(true);
    }

    const showModalProductDetailById = (record: ProductDetailResponse) => {
        setSelectedProductDetail(record.id);
        setIsModalProductDetail(true);
    }

    const handleCancelProductDetailModal = () => {
        setIsModalProductDetail(false);
        setSelectedProductDetail(null);
        findAllProductDetail(currentPage, pageSize);
    }

    const findAllProductDetail = useCallback(async (page: number, size: number): Promise<void> => {
        try {
            const res = await axios.get(
                `${LOCALHOST}${MAPPING_URL.PRODUCT_DETAIL}${API_URL.PRODUCT_DETAIL.FIND_ALL_PRODUCT_DETAIL}`, {
                params: {
                    page: page - 1,
                    size: size,
                },
            });
    
            const { content, page: pagination } = res.data;
            const totalElements = pagination.totalElements ?? 0;
            setTotalProductDetail(totalElements);
            setTotalPages(pagination.totalPages);
    
            const productDetailsWithImages = await Promise.all(
                content.map(async (productDetail: ProductDetailResponse) => {
                    const imageResponse = await findAllImageByProductDetailId(productDetail.id) ?? [];
                    return {
                        ...productDetail,
                        imageUrl: imageResponse[0]?.imageUrl || '',
                    };
                })
            );
            setProductDetails(productDetailsWithImages);
        } catch (err) {
            console.error(err);
        }
    }, []);    

    const findAllImageByProductDetailId = useCallback(async (productDetailId: number) => {
        try {
            if (productDetailId && !loadedImages.includes(productDetailId)) {
                const url = `${LOCALHOST}${MAPPING_URL.IMAGE}${API_URL.IMAGE.FIND_IMAGE_BY_PRODUCT_DETAIL_ID}/${productDetailId}`;
                const response = await axios.get<ImageResponse[]>(url);
                setLoadedImages((prev) => [...prev, productDetailId]);
                return response.data;
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            return [];
        }
    }, [loadedImages]);

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN')
    }

    useEffect(() => {
        findAllProductDetail(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const columns: ColumnsType<ProductDetailResponse> = [
        {
            title: 'Image',
            key: 'imageUrl',
            align: 'center',
            render: (record: { imageUrl: string }) => (
                <img
                    src={record.imageUrl}
                    alt="Product"
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                />
            ),
        },
        {
            title: 'Product name',
            dataIndex: 'productName',
            align: 'center',
            key: 'productName',
        },
        {
            title: 'Color',
            dataIndex: 'colorName',
            align: 'center',
            key: 'colorName',
        },
        {
            title: 'Size',
            dataIndex: 'sizeName',
            align: 'center',
            key: 'sizeName',
        },
        {
            title: 'Create date',
            dataIndex: 'createDate',
            align: 'center',
            key: 'createDate',
            render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Update date',
            dataIndex: 'updateDate',
            align: 'center',
            key: 'updateDate',
            render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            align: 'center',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'productPrice',
            key: 'productPrice',
            align: 'center',
            render: (price: number) => formatPrice(price) + " VND"
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align: 'center',
            key: 'status',
            render: (status: boolean) => (status ? 'Còn bán' : 'Không còn bán'),
        },
        {
            title: 'QR code',
            dataIndex: 'qrcode',
            align: 'center',
            key: 'qrcode',
            render: (qrcode: string) => (
                qrcode ? (
                    <img src={qrcode} alt="QR Code" style={{ width: 50, height: 50 }} />
                ) : (
                    <img src="https://www.qrcodepress.com/wp-content/uploads/2014/09/QR-code-detective-when-not-to-use.jpg" alt="QR Code" style={{ width: 50, height: 50 }} />
                )
            ),
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (record) => (
                <span>
                    <EditOutlined
                        style={{ cursor: 'pointer'}}
                        onClick={() => showModalProductDetailById(record)}
                    />
                </span>
            ),
        },
    ];

    return (
        <>
            <Button className="button-insert" onClick={showModalProductDetail}>
                New product detail +
            </Button>
            <Modal
                title="Product detail"
                open={isModalOpenProductDetail}
                onCancel={handleCancelProductDetailModal}
                footer={null}
            >
                <ProductDetail
                    handleCancelProductDetailModal={handleCancelProductDetailModal}
                    selectedProductDetail={selectedProductDetail}
                />
            </Modal>
            <Table<ProductDetailResponse>
                dataSource={productDetails}
                columns={columns}
                pagination={false}
                rowKey="id"
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalBuyOption={totalProductDetail}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </>
    );
};

export default ListProductDetail;
