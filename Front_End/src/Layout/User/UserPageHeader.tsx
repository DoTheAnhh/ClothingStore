import { Input } from 'antd'
import React from 'react'

const UserPageHeader: React.FC = () => {
    return (
        <>
            <div className='logo'>
                <img width={70} src="/src/assets/Do The Anh.jpg" alt="Logo" />
                <Input style={{ width: 200 }} type="text"/>
            </div>
        </>
    )
}

export default UserPageHeader