package com.example.clothingstore.service;

import com.example.clothingstore.dto.customer.CustomerRequest;
import com.example.clothingstore.dto.customer.CustomerResponse;
import com.example.clothingstore.dto.login.CheckPasswordRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CustomerService {

    Page<CustomerResponse> findAll(Pageable pageable);

    Optional<CustomerResponse> findById(Long id);

    void insert(CustomerRequest customerRequest);

    void edit(CustomerRequest customerRequest, Long id);

    Long editResetTokenForCustomer(String resetToken, Long id);

    boolean checkPassword(CheckPasswordRequest request);
}
