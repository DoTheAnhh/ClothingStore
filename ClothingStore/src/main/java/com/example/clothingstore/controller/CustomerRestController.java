package com.example.clothingstore.controller;

import com.example.clothingstore.dto.request.CustomerRequest;
import com.example.clothingstore.dto.response.CustomerResponse;
import com.example.clothingstore.entity.Customer;
import com.example.clothingstore.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/customer")
public class CustomerRestController {

    @Autowired
    CustomerService customerService;

    @GetMapping
    public Page<CustomerResponse> findAll(@PageableDefault(size = 5) Pageable pageable) {
        return customerService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> findById(@PathVariable Long id) {
        Optional<CustomerResponse> e = customerService.findById(id);
        return e.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/insert")
    public void insertCustomer(@RequestBody CustomerRequest customerRequest) {
        customerService.insert(customerRequest);
    }

    @PutMapping("/edit/{id}")
    public void editCustomer(@PathVariable Long id, @RequestBody CustomerRequest customerRequest) {
        customerService.edit(customerRequest, id);
    }
}
