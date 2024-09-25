package com.example.clothingstore.controller;

import com.example.clothingstore.dto.product_detail.ProductDetailRequest;
import com.example.clothingstore.dto.product_detail.ProductDetailResponse;
import com.example.clothingstore.dto.qrcode_update.QRCodeUpdateRequest;
import com.example.clothingstore.entity.ProductDetail;
import com.example.clothingstore.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/product-detail")
public class ProductDetailRestController {

    @Autowired
    private ProductDetailService productDetailService;

    @GetMapping
    public Page<ProductDetailResponse> findAllProductDetail(@PageableDefault Pageable pageable) {
        return productDetailService.findAllProductDetails(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailResponse> getProductDetailById(@PathVariable Long id) {
        Optional<ProductDetailResponse> productDetailResponse = productDetailService.getProductDetailById(id);
        return productDetailResponse.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/insert")
    public ResponseEntity<Long> createProductDetail(@RequestBody ProductDetailRequest productDetailRequest) {
        Long id = productDetailService.insertProductDetail(productDetailRequest);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<ProductDetailResponse> updateProductDetail(
            @PathVariable Long id,
            @RequestBody ProductDetailRequest productDetailRequest) {
        Optional<ProductDetailResponse> updatedProductDetail = productDetailService.editProductDetail(productDetailRequest, id);
        return updatedProductDetail.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update-qrcode")
    public void updateQRCode(@RequestBody QRCodeUpdateRequest request) {
        productDetailService.updateQRCode(request.getId(), request.getQrcode());
    }
}
