package com.example.clothingstore.controller;

import com.example.clothingstore.dto.request.BrandRequest;
import com.example.clothingstore.dto.response.BrandResponse;
import com.example.clothingstore.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/brand")
public class BrandRestController {

    @Autowired
    private BrandService brandService;

    @GetMapping
    public List<BrandResponse> findAllBrands() {
        return brandService.getAllBrands();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BrandResponse> findBrandById(@PathVariable Long id) {
        Optional<BrandResponse> brandResponse = brandService.findBrandById(id);
        return brandResponse.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/insert")
    public void insertSize(@RequestBody BrandRequest brandRequest) {
        brandService.insertBrand(brandRequest);
    }

    @PutMapping("/edit/{id}")
    public void editSize(@PathVariable Long id, @RequestBody BrandRequest brandRequest) {
        brandService.editBrand(brandRequest, id);
    }
}
