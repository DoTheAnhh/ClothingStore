package com.example.clothingstore.mapper;

import com.example.clothingstore.dto.request.CustomerRequest;
import com.example.clothingstore.dto.response.CustomerResponse;
import com.example.clothingstore.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface CustomerMapper {

    CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);

    CustomerResponse toDto(Customer customer);

    Customer toEntity(CustomerRequest customerRequest);

    List<CustomerResponse> toDtoList(List<Customer> customer);

    List<Customer> toEntityList(List<CustomerRequest> customerRequest);
}
