package com.example.clothingstore.controller;

import com.example.clothingstore.dto.brand.BrandResponse;
import com.example.clothingstore.dto.shipping_address.ShippingAddressResponse;
import com.example.clothingstore.service.ShippingAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/shipping-address")
public class ShippingAddressRestController {

    @Autowired
    private ShippingAddressService shippingAddressService;

    @GetMapping("/customer/{customerId}")
    public List<ShippingAddressResponse> findAll(@PathVariable Long customerId){
        return shippingAddressService.findByCustomerId(customerId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShippingAddressResponse> findBrandById(@PathVariable Long id) {
        Optional<ShippingAddressResponse> shippingAddressResponse = shippingAddressService.findById(id);
        return shippingAddressResponse.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
