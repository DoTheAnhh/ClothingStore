package com.example.clothingstore.service.impl;

import com.example.clothingstore.dto.product.ProductRequest;
import com.example.clothingstore.dto.product.ProductResponse;
import com.example.clothingstore.entity.Brand;
import com.example.clothingstore.entity.Product;
import com.example.clothingstore.entity.Type;
import com.example.clothingstore.mapper.ProductMapper;
import com.example.clothingstore.repository.BrandRepository;
import com.example.clothingstore.repository.ProductRepository;
import com.example.clothingstore.repository.TypeRepository;
import com.example.clothingstore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IProductService implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private TypeRepository typeRepository;

    private final ProductMapper productMapper = ProductMapper.INSTANCE;

    @Override
    public List<ProductResponse> findAllProducts() {
        List<Product> products = productRepository.findAll();
        return productMapper.toDtoList(products);
    }

    @Override
    public Optional<ProductResponse> findProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(productMapper::toDto);
    }

    @Override
    public void insertProduct(ProductRequest productRequest) {
        Product product = productMapper.toEntity(productRequest);
        productRepository.save(product);
    }

    @Override
    public void editProduct(ProductRequest productRequest, Long id) {
        Optional<Product> existing = productRepository.findById(id);
        if (existing.isPresent()) {
            Product existingProduct = existing.get();

            Brand brand = brandRepository.findById(productRequest.getBrandId())
                    .orElseThrow(() -> new RuntimeException("Brand not found"));
            Type type = typeRepository.findById(productRequest.getTypeId())
                    .orElseThrow(() -> new RuntimeException("Type not found"));

            existingProduct.setProductCode(productRequest.getProductCode());
            existingProduct.setProductName(productRequest.getProductName());
            existingProduct.setProductDescription(productRequest.getProductDescription());
            existingProduct.setBrand(brand);
            existingProduct.setType(type);

            productRepository.save(existingProduct);
        }
    }
}
