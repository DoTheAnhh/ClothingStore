package com.example.clothingstore.service.impl;

import com.example.clothingstore.dto.cart.CartRequest;
import com.example.clothingstore.dto.cart.CartResponse;
import com.example.clothingstore.entity.Cart;
import com.example.clothingstore.entity.Customer;
import com.example.clothingstore.entity.ProductDetail;
import com.example.clothingstore.mapper.CartMapper;
import com.example.clothingstore.repository.CartRepository;
import com.example.clothingstore.repository.CustomerRepository;
import com.example.clothingstore.repository.ProductDetailRepository;
import com.example.clothingstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ICartService implements CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    ProductDetailRepository productDetailRepository;

    @Autowired
    CustomerRepository customerRepository;

    private final CartMapper cartMapper = CartMapper.INSTANCE;

    @Override
    public List<CartResponse> getAllCart() {
        List<Cart> carts = cartRepository.findAll();
        return cartMapper.toDtoList(carts);
    }

    @Override
    public CartResponse addProductToCart(CartRequest cartRequest) {
        // Tìm khách hàng
        Customer customer = customerRepository.findById(cartRequest.getCustomerId())
                .orElseThrow(() -> {
                    System.out.println("Customer not found with ID: " + cartRequest.getCustomerId());
                    return new RuntimeException("Customer not found");
                });

        // Tìm sản phẩm
        ProductDetail productDetail = productDetailRepository.findById(cartRequest.getProductDetailId())
                .orElseThrow(() -> {
                    System.out.println("ProductDetail not found with ID: " + cartRequest.getProductDetailId());
                    return new RuntimeException("Product not found");
                });

        // Tìm sản phẩm trong giỏ hàng của người dùng
        Cart existingCartItem = cartRepository.findByCustomerAndProductDetail(customer, productDetail);

        if (existingCartItem != null) {
            // Nếu sản phẩm đã có trong giỏ, cập nhật số lượng và tổng giá
            existingCartItem.setQuantity(existingCartItem.getQuantity() + cartRequest.getQuantity());
            existingCartItem.setTotalPrice(existingCartItem.getQuantity() * productDetail.getProductPrice());
            cartRepository.save(existingCartItem);

            return CartMapper.INSTANCE.toDto(existingCartItem);
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, tạo mới
            Cart newCartItem = new Cart();
            newCartItem.setCustomer(customer);
            newCartItem.setProductDetail(productDetail);
            newCartItem.setQuantity(cartRequest.getQuantity());
            newCartItem.setTotalPrice(cartRequest.getQuantity() * productDetail.getProductPrice()); // Đảm bảo giá trị này được tính toán chính xác
            cartRepository.save(newCartItem);

            // Trả về phản hồi
            return CartMapper.INSTANCE.toDto(newCartItem);
        }
    }

}
