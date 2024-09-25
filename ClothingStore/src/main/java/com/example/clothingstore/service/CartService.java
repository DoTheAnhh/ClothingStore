package com.example.clothingstore.service;

import com.example.clothingstore.dto.cart.CartRequest;
import com.example.clothingstore.dto.cart.CartResponse;

import java.util.List;

public interface CartService {

    List<CartResponse> getAllCart();

    CartResponse addProductToCart(CartRequest cartRequest);
}
