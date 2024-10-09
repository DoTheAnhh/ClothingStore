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

            // Lấy thông tin về product detail
            ProductDetail productDetail = cart.getProductDetail();

            // Kiểm tra số lượng hợp lệ
            if (quantity < 0) {
                throw new IllegalArgumentException("Số lượng không hợp lệ");
            }

            // Kiểm tra số lượng không được lớn hơn số lượng hiện có của product detail
            if (quantity > productDetail.getQuantity()) { // Giả sử getAvailableQuantity() trả về số lượng hiện có
                throw new IllegalArgumentException("Số lượng cập nhật không được lớn hơn số lượng hiện có: " + productDetail.getQuantity());
            }

            // Cập nhật số lượng
            cart.setQuantity(quantity);

            // Tính toán lại tổng tiền
            float newTotalPrice = productDetail.getProductPrice() * quantity;
            cart.setTotalPrice(newTotalPrice);

            // Lưu cart đã cập nhật
            cartRepository.save(cart);
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

    @Override
    public void clearCartAndUpdateProductDetailQuantity(Long customerId) {
        List<Cart> cartItems = cartRepository.findCartByCustomerId(customerId);

        for (Cart cartItem : cartItems) {
            // Lấy ProductDetail từ cartItem
            ProductDetail productDetail = cartItem.getProductDetail();

            // Kiểm tra số lượng trong cart không vượt quá số lượng hiện có
            if (cartItem.getQuantity() > productDetail.getQuantity()) {
                throw new IllegalArgumentException("Số lượng trong giỏ hàng chỉ còn lại: " + productDetail.getId() + " sản phẩm");
            }

            // Trừ đi quantity trong cart từ quantity của productDetail
            int newQuantity = productDetail.getQuantity() - cartItem.getQuantity();

            // Cập nhật lại số lượng của ProductDetail
            productDetail.setQuantity(newQuantity);
            productDetailRepository.save(productDetail);
        }

        // Xóa tất cả các productDetail trong cart của customerId
        cartRepository.deleteAll(cartItems);
    }
}
