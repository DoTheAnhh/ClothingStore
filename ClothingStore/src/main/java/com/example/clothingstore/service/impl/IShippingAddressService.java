package com.example.clothingstore.service.impl;

import com.example.clothingstore.dto.shipping_address.ShippingAddressRequest;
import com.example.clothingstore.dto.shipping_address.ShippingAddressResponse;
import com.example.clothingstore.entity.Customer;
import com.example.clothingstore.entity.ShippingAddress;
import com.example.clothingstore.mapper.ShippingAddressMapper;
import com.example.clothingstore.repository.CustomerRepository;
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

    @Autowired
    CustomerRepository customerRepository;

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

    @Override
    public void insert(ShippingAddressRequest shippingAddressRequest){
        ShippingAddress shippingAddress = shippingAddressMapper.toEntity((shippingAddressRequest));
        shippingAddressRepository.save(shippingAddress);
    }

    @Override
    public void edit(ShippingAddressRequest shippingAddressRequest, Long id){
        Optional<ShippingAddress> existing = shippingAddressRepository.findById(id);
        if (existing.isPresent()) {
            ShippingAddress existingShippingAddress = existing.get();

            Customer customer = customerRepository.findById(shippingAddressRequest.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));;

            existingShippingAddress.setUserName(shippingAddressRequest.getUserName());
            existingShippingAddress.setPhoneNumber(shippingAddressRequest.getPhoneNumber());
            existingShippingAddress.setProvinceName(shippingAddressRequest.getProvinceName());
            existingShippingAddress.setDistrictName(shippingAddressRequest.getDistrictName());
            existingShippingAddress.setWardName(shippingAddressRequest.getWardName());
            existingShippingAddress.setAddressDetail(shippingAddressRequest.getWardName());
            existingShippingAddress.setCustomer(customer);

            shippingAddressRepository.save(existingShippingAddress);
        }
    }
}
