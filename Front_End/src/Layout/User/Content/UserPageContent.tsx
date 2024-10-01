import React from 'react'
import CarouselContent from './Carousel/Carousel'
import NewProduct from '../NewProduct/NewProduct'
import BestSellingProduct from '../BestSellingProduct/BestSellingProduct'
import AllProduct from '../AllProduct/AllProduct'

const UserPageContent: React.FC = () => {
    return (
        <>
            <CarouselContent />
            <AllProduct/>
            <BestSellingProduct/>
            <NewProduct />
        </>

    )
}

export default UserPageContent