package com.example.clothingstore.controller;

import com.example.clothingstore.dto.cart.CartRequest;
import com.example.clothingstore.dto.cart.CartResponse;
import com.example.clothingstore.service.CartService;
import jakarta.persistence.EntityNotFoundException;
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
    public ResponseEntity<List<CartResponse>> getAllCartByCustomerId(@RequestParam Long customerId) {
        return new ResponseEntity<>(cartService.getAllCartByCustomerId(customerId), HttpStatus.OK);
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

    @PutMapping("/update-quantity")
    public ResponseEntity<String> updateQuantity(
            @RequestParam Long productDetailId,
            @RequestParam int quantity) {
        try {
            cartService.updateQuantityProductDetailInCart(productDetailId, quantity);
            return ResponseEntity.ok("Cập nhật số lượng thành công");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete-product-detail-in-cart/{id}")
    public void deleteProductDetailInCart(@PathVariable Long id) {
        cartService.deleteProductDetailInCart(id);
    }
}
