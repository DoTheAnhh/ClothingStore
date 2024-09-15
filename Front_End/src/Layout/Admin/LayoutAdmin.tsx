import React from 'react'
import MenuBar from './MenuBar/MenuBar'
import Content from './Content/Content'
import './css/LayoutAdmin.scss'
import HeaderLayoutAdmin from './Header/HeaderLayoutAdmin'

const LayoutAdmin: React.FC = () => {    

    return (
        <>
            <HeaderLayoutAdmin />
            <div className="layout-admin-container">
                <div className="main-content">
                    <div className="menu">
                        <MenuBar />
                    </div>
                    <div className="content">
                        <Content />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LayoutAdmin
