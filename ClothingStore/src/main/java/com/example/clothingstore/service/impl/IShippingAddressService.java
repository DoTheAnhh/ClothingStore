package com.example.clothingstore.service.impl;

import com.example.clothingstore.dto.shipping_address.ShippingAddressResponse;
import com.example.clothingstore.entity.ShippingAddress;
import com.example.clothingstore.mapper.ShippingAddressMapper;
import com.example.clothingstore.repository.ShippingAddressRepository;
import com.example.clothingstore.service.ShippingAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IShippingAddressService implements ShippingAddressService {

    @Autowired
    ShippingAddressRepository shippingAddressRepository;

    private final ShippingAddressMapper shippingAddressMapper = ShippingAddressMapper.INSTANCE;

    @Override
    public List<ShippingAddressResponse> findByCustomerId(Long customerId) {
        List<ShippingAddress> shippingAddresses = shippingAddressRepository.findByCustomerId(customerId);
        return shippingAddressMapper.toDtoList(shippingAddresses);
    }

    @Override
    public Optional<ShippingAddressResponse> findById(Long id) {
        Optional<ShippingAddress> shippingAddress = shippingAddressRepository.findById(id);
        return shippingAddress.map(shippingAddressMapper::toDto);
    }
}
