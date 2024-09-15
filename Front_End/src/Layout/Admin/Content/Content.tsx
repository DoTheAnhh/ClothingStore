import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListProductDetail from '../../../ProductDetail/ListProductDetail'
import ListProduct from '../../../Product/ListProduct'
import HomePage from '../../../DashBoard/DashBoard'
import ListCustomer from '../../../Customer/ListCustomer'

const Content: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/dash-board' element={<HomePage />}></Route>
        <Route path='/products' element={<ListProduct />}></Route>
        <Route path='/product-details' element={<ListProductDetail />}></Route>
        <Route path='/customers' element={<ListCustomer />}></Route>
      </Routes>
    </>
  )
}

export default Content