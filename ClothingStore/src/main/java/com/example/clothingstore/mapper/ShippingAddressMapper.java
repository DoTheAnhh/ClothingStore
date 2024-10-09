package com.example.clothingstore.mapper;

import com.example.clothingstore.dto.shipping_address.ShippingAddressRequest;
import com.example.clothingstore.dto.shipping_address.ShippingAddressResponse;
import com.example.clothingstore.entity.ShippingAddress;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ShippingAddressMapper {

    ShippingAddressMapper INSTANCE = Mappers.getMapper(ShippingAddressMapper.class);

    @Mapping(source = "id", target = "shippingAddressId")
    ShippingAddressResponse toDto(ShippingAddress shippingAddresses);

    @Mapping(source = "customerId", target = "customer.id")
    ShippingAddress toEntity(ShippingAddressRequest shippingAddressRequest);

    List<ShippingAddressResponse> toDtoList(List<ShippingAddress> shippingAddresses);
}
