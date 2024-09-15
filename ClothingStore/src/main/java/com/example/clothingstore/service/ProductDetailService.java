package com.example.clothingstore.service;

import com.example.clothingstore.dto.request.ProductDetailRequest;
import com.example.clothingstore.dto.response.ProductDetailResponse;
import com.example.clothingstore.entity.ProductDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ProductDetailService {

    Page<ProductDetailResponse> findAllProductDetails(Pageable pageable);

    Optional<ProductDetailResponse> getProductDetailById(Long id);

    Long insertProductDetail(ProductDetailRequest productDetailRequest);

    Optional<ProductDetail> editProductDetail(ProductDetailRequest productDetailRequest, Long id);

    void updateQRCode(Long id, String qrcode);
}
