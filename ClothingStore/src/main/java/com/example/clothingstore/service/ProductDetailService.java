package com.example.clothingstore.service;

import com.example.clothingstore.dto.product_detail.FindProductDetailToCartDTO;
import com.example.clothingstore.dto.product_detail.ProductDetailRequest;
import com.example.clothingstore.dto.product_detail.ProductDetailResponse;
import com.example.clothingstore.dto.size.SizeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductDetailService {

    Page<ProductDetailResponse> findAllProductDetails(Pageable pageable);

    Optional<ProductDetailResponse> getProductDetailById(Long id);

    Long findProductDetailToCart(FindProductDetailToCartDTO findProductDetailToCartDTO);

    List<SizeDTO> findSizeIdsByColorIdInProductDetail(Long colorId);

    Long insertProductDetail(ProductDetailRequest productDetailRequest);

    Optional<ProductDetailResponse> editProductDetail(ProductDetailRequest productDetailRequest, Long id);

    void updateQRCode(Long id, String qrcode);

}
