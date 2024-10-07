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
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public List<CartResponse> getAllCartByCustomerId(Long customerId) {
        List<Cart> carts = cartRepository.findCartByCustomerId(customerId);
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

    @Override
    public void updateQuantityProductDetailInCart(Long productDetailId, int quantity) {
        Optional<Cart> cartOptional = cartRepository.findByProductDetailId(productDetailId);

        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();

            // Cập nhật số lượng nếu số lượng hợp lệ (ví dụ số lượng >= 0)
            if (quantity >= 0) {
                cart.setQuantity(quantity);

                // Tính toán lại tổng tiền
                float newTotalPrice = cart.getProductDetail().getProductPrice() * quantity;
                cart.setTotalPrice(newTotalPrice);

                // Lưu cart đã cập nhật
                cartRepository.save(cart);
            } else {
                throw new IllegalArgumentException("Số lượng không hợp lệ");
            }
        } else {
            throw new EntityNotFoundException("Không tìm thấy cart với ProductDetailId: " + productDetailId);
        }
    }

    @Override
    public void deleteProductDetailInCart(Long id) {
        cartRepository.deleteById(id);
    }

    @Override
    public Long countProductDetailInCart(Long customerId){
        return cartRepository.countProductDetailInCart(customerId);
    }
}
