package com.example.clothingstore.service.impl;

import com.example.clothingstore.dto.customer.CustomerRequest;
import com.example.clothingstore.dto.customer.CustomerResponse;
import com.example.clothingstore.dto.login.CheckPasswordRequest;
import com.example.clothingstore.dto.product_detail.ProductDetailRequest;
import com.example.clothingstore.entity.Customer;
import com.example.clothingstore.mapper.CustomerMapper;
import com.example.clothingstore.repository.CustomerRepository;
import com.example.clothingstore.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ICustomerService implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    private final CustomerMapper customerMapper = CustomerMapper.INSTANCE;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Page<CustomerResponse> findAll(Pageable pageable) {
        Page<Customer> customerPage = customerRepository.findAll(pageable);
        List<CustomerResponse> customerResponses = customerMapper.toDtoList(customerPage.getContent());
        return new PageImpl<>(customerResponses, pageable, customerPage.getTotalElements());
    }

    @Override
    public Optional<CustomerResponse> findById(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        return customer.map(customerMapper::toDto);
    }

    @Override
    public void insert(CustomerRequest customerRequest) {
        if (customerRepository.findByEmail(customerRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists: " + customerRequest.getEmail());
        }
        Customer customer = customerMapper.toEntity(customerRequest);
        customerRepository.save(customer);
    }

    @Override
    public void edit(CustomerRequest customerResponse, Long id) {
        Optional<Customer> customerOptional = customerRepository.findById(id);

        if (customerOptional.isPresent()) {
            Customer existingCustomer = customerOptional.get();

            // Kiểm tra xem email đã tồn tại và không phải của chính khách hàng đang chỉnh sửa
            Optional<Customer> existingEmailCustomer = customerRepository.findByEmail(customerResponse.getEmail());
            if (existingEmailCustomer.isPresent() && !existingEmailCustomer.get().getId().equals(id)) {
                throw new RuntimeException("Email already exists: " + customerResponse.getEmail());
            }

            // Cập nhật thông tin khách hàng
            existingCustomer.setName(customerResponse.getName());
            existingCustomer.setAge(customerResponse.getAge());
            existingCustomer.setGender(customerResponse.isGender());
            existingCustomer.setBirthday(customerResponse.getBirthday());
            existingCustomer.setLocation(customerResponse.getLocation());
            existingCustomer.setEmail(customerResponse.getEmail());
            existingCustomer.setPassword(customerResponse.getPassword());
            existingCustomer.setRole(customerResponse.getRole());

            customerRepository.save(existingCustomer);
        } else {
            throw new RuntimeException("Customer not found with id: " + id);
        }
    }


    @Override
    public Long editResetTokenForCustomer(String resetToken, Long id) {
        Optional<Customer> existingCustomerOptional = customerRepository.findById(id);

        if (existingCustomerOptional.isPresent()) {
            Customer existingCustomer = existingCustomerOptional.get();

            existingCustomer.setResetToken(resetToken);

            Customer updatedCustomer = customerRepository.save(existingCustomer);

            return updatedCustomer.getId();
        } else {
            throw new RuntimeException("Customer not found");
        }
    }

    @Override
    public boolean checkPassword(CheckPasswordRequest request) {
        Customer customer = customerRepository.findByEmail(request.getEmail()).orElseThrow(() ->
                new RuntimeException("User not found with email: " + request.getEmail()));
        String passwordInDatabase = customer.getPassword();

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), passwordInDatabase);

        if (!passwordMatches) {
            passwordMatches = request.getPassword().equals(passwordInDatabase);
        }

        if (!passwordMatches) {
            return passwordEncoder.matches(request.getPassword(), passwordInDatabase);
        }
        return passwordMatches;
    }
}
