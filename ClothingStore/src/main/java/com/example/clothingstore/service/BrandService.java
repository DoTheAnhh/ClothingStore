package com.example.clothingstore.service;

import com.example.clothingstore.dto.brand.BrandRequest;
import com.example.clothingstore.dto.brand.BrandResponse;

import java.util.List;
import java.util.Optional;

public interface BrandService {

    List<BrandResponse> getAllBrands();

    Optional<BrandResponse> findBrandById(Long id);

    void insertBrand(BrandRequest brandRequest);

    void editBrand(BrandRequest brandRequest, Long id);
}
