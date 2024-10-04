package com.example.clothingstore.repository;

import com.example.clothingstore.entity.Cart;
import com.example.clothingstore.entity.Customer;
import com.example.clothingstore.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart findByCustomerAndProductDetail(Customer customer, ProductDetail productDetail);

    Optional<Cart> findByProductDetailId(Long productDetailId);
}
