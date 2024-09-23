package com.example.clothingstore.service;

import com.example.clothingstore.dto.product.ProductRequest;
import com.example.clothingstore.dto.product.ProductResponse;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<ProductResponse> findAllProducts();

    Optional<ProductResponse> findProductById(Long id);

    void insertProduct(ProductRequest productRequest);

    void editProduct(ProductRequest productRequest, Long id);
}
