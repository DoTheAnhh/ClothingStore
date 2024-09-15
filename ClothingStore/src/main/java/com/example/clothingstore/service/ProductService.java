package com.example.clothingstore.service;

import com.example.clothingstore.dto.request.BrandRequest;
import com.example.clothingstore.dto.request.ProductRequest;
import com.example.clothingstore.dto.response.ProductResponse;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<ProductResponse> findAllProducts();

    Optional<ProductResponse> findProductById(Long id);

    void insertProduct(ProductRequest productRequest);

    void editProduct(ProductRequest productRequest, Long id);
}
