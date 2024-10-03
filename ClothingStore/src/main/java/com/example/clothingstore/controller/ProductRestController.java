package com.example.clothingstore.controller;

import com.example.clothingstore.dto.product.ProductRequest;
import com.example.clothingstore.dto.product.ProductResponse;
import com.example.clothingstore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product")
public class ProductRestController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductResponse> findAllProducts() {
        return productService.findAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> findProductById(@PathVariable Long id) {
        Optional<ProductResponse> productResponse = productService.findProductById(id);
        return productResponse.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{typeId}")
    public List<ProductResponse> getProductsByType(@PathVariable Long typeId) {
        return productService.getProductsByTypeId(typeId);
    }

    @PostMapping("/insert")
    public void insertProduct(@RequestBody ProductRequest productRequest) {
        productService.insertProduct(productRequest);
    }

    @PutMapping("/edit/{id}")
    public void editSize(@PathVariable Long id, @RequestBody ProductRequest productRequest) {
        productService.editProduct(productRequest, id);
    }
}
