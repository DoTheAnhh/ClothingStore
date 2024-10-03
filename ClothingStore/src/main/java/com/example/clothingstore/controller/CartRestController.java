package com.example.clothingstore.controller;

import com.example.clothingstore.dto.cart.CartRequest;
import com.example.clothingstore.dto.cart.CartResponse;
import com.example.clothingstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartRestController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartResponse>> getAllCart() {
        return new ResponseEntity<>(cartService.getAllCart(), HttpStatus.OK);
    }

    @PostMapping("/add-product-to-cart")
    public ResponseEntity<CartResponse> addProductToCart(@RequestBody CartRequest cartRequest) {
        try {
            CartResponse cartResponse = cartService.addProductToCart(cartRequest);
            return new ResponseEntity<>(cartResponse, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
