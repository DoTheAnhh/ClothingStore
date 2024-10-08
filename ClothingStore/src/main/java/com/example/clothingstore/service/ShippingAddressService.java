package com.example.clothingstore.service;

import com.example.clothingstore.dto.shipping_address.ShippingAddressRequest;
import com.example.clothingstore.dto.shipping_address.ShippingAddressResponse;

import java.util.List;
import java.util.Optional;

public interface ShippingAddressService {

    List<ShippingAddressResponse> findByCustomerId(Long customerId);

    Optional<ShippingAddressResponse> findById(Long id);

    void insert(ShippingAddressRequest shippingAddressRequest);

    void edit(ShippingAddressRequest shippingAddressRequest, Long id);
}
