import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import './css/Pagination.scss';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalBuyOption: number;
    onPageChange: (page: number, pageSize: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    pageSize,
    totalBuyOption,
    onPageChange,
    onPageSizeChange,
}) => {
    const handlePageChange = useCallback((page: number) => {
        onPageChange(page, pageSize);
    }, [onPageChange, pageSize]);

    const handlePageSizeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = Number(e.target.value);
        onPageSizeChange(newSize);
        handlePageChange(1);
    }, [onPageSizeChange, handlePageChange]);

    const handlePreviousPage = useCallback(() => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    }, [currentPage, handlePageChange]);

    const handleNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    }, [currentPage, totalPages, handlePageChange]);

    const pageSizeOptions = [5, 10, 20, 50, 75, 100];
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const startRecord = (currentPage - 1) * pageSize + 1;
    const endRecord = Math.min(currentPage * pageSize, totalBuyOption);

    return (
        <div className='pagination'>
            <div>
                <span>Số bản ghi mỗi trang: </span>
                <select id="pageSize" className='select-pagesize' value={pageSize} onChange={handlePageSizeChange}>
                    {pageSizeOptions.map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
                <span className='spe'>|</span>
                <span className='total-size'>{startRecord}-{endRecord} của {totalBuyOption} bản ghi</span>
            </div>
            <div className='page-number'>
                <select className='select-pagesize' onChange={(e) => handlePageChange(Number(e.target.value))} value={currentPage}>
                    {pageNumbers.map(page => (
                        <option key={page} value={page}>Trang {page}</option>
                    ))}
                </select>
                <span className='span-page-number'>của {totalPages} trang</span>
                <div className={`left ${currentPage === 1 ? 'disabled' : ''}`}>
                    <LeftOutlined onClick={handlePreviousPage} />
                </div>
                <div className={`right ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <RightOutlined onClick={handleNextPage} />
                </div>
            </div>
        </div>
    );
}

export default Pagination;
