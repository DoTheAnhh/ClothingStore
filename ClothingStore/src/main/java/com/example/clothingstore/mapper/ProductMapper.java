package com.example.clothingstore.mapper;

import com.example.clothingstore.dto.request.ProductRequest;
import com.example.clothingstore.dto.response.ProductResponse;
import com.example.clothingstore.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mapping(source = "brand.brandName", target = "brandName")
    @Mapping(source = "type.typeName", target = "typeName")
    ProductResponse toDto(Product product);

    @Mapping(source = "brandId", target = "brand.id")
    @Mapping(source = "typeId", target = "type.id")
    Product toEntity(ProductRequest productRequest);

    List<ProductResponse> toDtoList(List<Product> products);

    List<Product> toEntityList(List<ProductRequest> productRequest);
}