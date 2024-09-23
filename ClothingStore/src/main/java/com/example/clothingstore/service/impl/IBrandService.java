package com.example.clothingstore.service.impl;

import com.example.clothingstore.dto.brand.BrandRequest;
import com.example.clothingstore.dto.brand.BrandResponse;
import com.example.clothingstore.entity.Brand;
import com.example.clothingstore.mapper.BrandMapper;
import com.example.clothingstore.repository.BrandRepository;
import com.example.clothingstore.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IBrandService implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    private final BrandMapper brandMapper = BrandMapper.INSTANCE;

    @Override
    public List<BrandResponse> getAllBrands() {
        List<Brand> brands = brandRepository.findAll();
        return brandMapper.toDtoList(brands);
    }

    @Override
    public Optional<BrandResponse> findBrandById(Long id) {
        Optional<Brand> brand = brandRepository.findById(id);
        return brand.map(brandMapper::toDto);
    }

    @Override
    public void insertBrand(BrandRequest brandRequest) {
        Brand brand = brandMapper.toEntity(brandRequest);
        brandRepository.save(brand);
    }

    @Override
    public void editBrand(BrandRequest brandRequest, Long id) {
        Optional<Brand> existing = brandRepository.findById(id);
        if (existing.isPresent()) {
            Brand existingBrand = existing.get();
            existingBrand.setBrandName(brandRequest.getBrandName());
            brandRepository.save(existingBrand);
        }
    }
}
