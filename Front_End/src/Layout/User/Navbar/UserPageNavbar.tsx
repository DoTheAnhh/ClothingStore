import React from 'react'
import "./css/index.css"

const UserPageNavbar: React.FC = () => {
    return (
        <div>
            <hr className='hr' />
            <ul className='nav-ul'>
                <li className='nav-li'><a href="#all-product">Tất cả sản phẩm</a></li>
                <li className='nav-li'><a href="#best-selling-product">Sản phẩm bán chạy</a></li>
                <li className='nav-li'><a href="#new-product">Sản phẩm mới nhất</a></li>
                <li className='nav-li'><a href="#">Liên hệ</a></li>
            </ul>
            <hr className='hr' />
        </div>

    )
}

export default UserPageNavbar