package com.example.clothingstore.service.impl;

import com.example.clothingstore.dto.product_detail.ProductDetailRequest;
import com.example.clothingstore.dto.product_detail.ProductDetailResponse;
import com.example.clothingstore.entity.Color;
import com.example.clothingstore.entity.Product;
import com.example.clothingstore.entity.ProductDetail;
import com.example.clothingstore.entity.Size;
import com.example.clothingstore.mapper.ProductDetailMapper;
import com.example.clothingstore.repository.ColorRepository;
import com.example.clothingstore.repository.ProductDetailRepository;
import com.example.clothingstore.repository.ProductRepository;
import com.example.clothingstore.repository.SizeRepository;
import com.example.clothingstore.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IProductDetailService implements ProductDetailService {

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SizeRepository sizeRepository;

    private final ProductDetailMapper productDetailMapper = ProductDetailMapper.INSTANCE;

    @Override
    public Page<ProductDetailResponse> findAllProductDetails(Pageable pageable) {
        Page<ProductDetail> productDetailsPage = productDetailRepository.findAll(pageable);

        return productDetailsPage.map(productDetailMapper::toDto);
    }

    @Override
    public Optional<ProductDetailResponse> getProductDetailById(Long id) {
        Optional<ProductDetail> productDetail = productDetailRepository.findProductDetailById(id);
        return productDetail.map(productDetailMapper::toDto);
    }

    @Override
    public Long insertProductDetail(ProductDetailRequest productDetailRequest) {
        ProductDetail productDetail = productDetailMapper.toEntity(productDetailRequest);
        ProductDetail savedProductDetail = productDetailRepository.save(productDetail);
        return savedProductDetail.getId();
    }

    @Override
    public Optional<ProductDetailResponse> editProductDetail(ProductDetailRequest productDetailRequest, Long id) {
        Optional<ProductDetail> existingProductDetailOptional = productDetailRepository.findById(id);

        if (existingProductDetailOptional.isPresent()) {
            ProductDetail existingProductDetail = existingProductDetailOptional.get();

            Color color = colorRepository.findById(productDetailRequest.getColorId())
                    .orElseThrow(() -> new RuntimeException("Color not found"));
            Size size = sizeRepository.findById(productDetailRequest.getSizeId())
                    .orElseThrow(() -> new RuntimeException("Size not found"));
            Product product = productRepository.findById(productDetailRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            existingProductDetail.setQuantity(productDetailRequest.getQuantity());
            existingProductDetail.setStatus(productDetailRequest.getStatus());
            existingProductDetail.setColor(color);
            existingProductDetail.setSize(size);
            existingProductDetail.setProductPrice(productDetailRequest.getProductPrice());
            existingProductDetail.setProduct(product);

            ProductDetail updatedProductDetail = productDetailRepository.save(existingProductDetail);

            ProductDetailResponse response = productDetailMapper.toDto(updatedProductDetail);
            return Optional.of(response);
        } else {
            return Optional.empty();
        }
    }


    @Override
    public void updateQRCode(Long id, String qrcode) {
        productDetailRepository.updateQRCode(id, qrcode);
    }
}
