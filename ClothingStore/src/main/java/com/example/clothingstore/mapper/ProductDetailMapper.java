package com.example.clothingstore.mapper;

import com.example.clothingstore.dto.product_detail.ProductDetailRequest;
import com.example.clothingstore.dto.product_detail.ProductDetailResponse;
import com.example.clothingstore.entity.ProductDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ProductDetailMapper {

    ProductDetailMapper INSTANCE = Mappers.getMapper(ProductDetailMapper.class);

    @Mapping(source = "color.colorName", target = "colorName")
    @Mapping(source = "size.sizeName", target = "sizeName")
    @Mapping(source = "product.productName", target = "productName")
    ProductDetailResponse toDto(ProductDetail productDetail);

    @Mapping(source = "colorId", target = "color.id")
    @Mapping(source = "sizeId", target = "size.id")
    @Mapping(source = "productId", target = "product.id")
    ProductDetail toEntity(ProductDetailRequest productDetailRequest);

    List<ProductDetailResponse> toDtoList(List<ProductDetail> productDetails);
}
