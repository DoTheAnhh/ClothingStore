package com.example.clothingstore.service;

import com.example.clothingstore.dto.cart.CartRequest;
import com.example.clothingstore.dto.cart.CartResponse;

import java.util.List;

public interface CartService {

    List<CartResponse> getAllCartByCustomerId(Long customerId);

    CartResponse addProductToCart(CartRequest cartRequest);

    void updateQuantityProductDetailInCart(Long productDetailId, int quantity);

    void deleteProductDetailInCart(Long id);

    Long countProductDetailInCart(Long customerId);

    void clearCartAndUpdateProductDetailQuantity(Long customerId);
}
