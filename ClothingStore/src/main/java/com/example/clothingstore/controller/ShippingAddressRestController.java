package com.example.clothingstore.controller;

import com.example.clothingstore.dto.shipping_address.ShippingAddressRequest;
import com.example.clothingstore.dto.shipping_address.ShippingAddressResponse;
import com.example.clothingstore.service.ShippingAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/insert")
    public void insert(@RequestBody ShippingAddressRequest shippingAddressRequest) {
        shippingAddressService.insert(shippingAddressRequest);
    }

    @PutMapping("/edit/{id}")
    public void edit(@PathVariable Long id, @RequestBody ShippingAddressRequest shippingAddressRequest) {
        shippingAddressService.edit(shippingAddressRequest, id);
    }
}
