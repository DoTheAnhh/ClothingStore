import React from 'react'
import CarouselContent from './Carousel/Carousel'
import AllProduct from './AllProduct/AllProduct'
import BestSellingProduct from './BestSellingProduct/BestSellingProduct'
import NewProduct from './NewProduct/NewProduct'


const UserPageContent: React.FC = () => {
    return (
        <>
            <CarouselContent />
            <AllProduct />
            <BestSellingProduct />
            <NewProduct />
        </>

    )
}
export default UserPageContent