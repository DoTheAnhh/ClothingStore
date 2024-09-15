package com.example.clothingstore.service;

import com.example.clothingstore.dto.request.CustomerRequest;
import com.example.clothingstore.dto.response.CustomerResponse;
import com.example.clothingstore.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CustomerService {

    Page<CustomerResponse> findAll(Pageable pageable);

    Optional<CustomerResponse> findById(Long id);

    void insert(CustomerRequest customerRequest);

    void edit(CustomerRequest customerRequest, Long id);
}
