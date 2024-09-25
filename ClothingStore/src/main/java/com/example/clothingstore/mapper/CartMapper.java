package com.example.clothingstore.mapper;

import com.example.clothingstore.dto.cart.CartResponse;
import com.example.clothingstore.entity.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface CartMapper {

    CartMapper INSTANCE = Mappers.getMapper(CartMapper.class);

    @Mapping(source = "voucher.voucherCode", target = "voucherCode")
    @Mapping(source = "productDetail.product.productName", target = "productName")
    @Mapping(source = "productDetail.productPrice", target = "productPrice")
    @Mapping(source = "customer.name", target = "name")
    CartResponse toDto(Cart cart);

    @Mapping(source = "voucher.voucherCode", target = "voucherCode")
    @Mapping(source = "productDetail.product.productName", target = "productName")
    @Mapping(source = "productDetail.productPrice", target = "productPrice")
    @Mapping(source = "customer.name", target = "name")
    List<CartResponse> toDtoList(List<Cart> carts);
}
