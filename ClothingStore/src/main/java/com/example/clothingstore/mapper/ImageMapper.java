package com.example.clothingstore.mapper;

import com.example.clothingstore.dto.image.ImageCustomerRequest;
import com.example.clothingstore.dto.image.ImageCustomerResponse;
import com.example.clothingstore.dto.image.ImageProductDetailRequest;
import com.example.clothingstore.dto.image.ImageProductDetailResponse;
import com.example.clothingstore.entity.Customer;
import com.example.clothingstore.entity.Image;
import com.example.clothingstore.entity.ProductDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ImageMapper {

    ImageMapper INSTANCE = Mappers.getMapper(ImageMapper.class);

    @Mapping(target = "productDetail", source = "productDetailId", qualifiedByName = "mapProductDetailById")
    Image toEntity(ImageProductDetailRequest imageProductDetailRequest);

    List<ImageProductDetailResponse> toDtoList(List<Image> images);

    @Named("mapProductDetailById")
    default ProductDetail mapProductDetailById(Long productDetailId) {
        if (productDetailId == null) {
            return null;
        }
        return null;
    }

    @Mapping(target = "customer", source = "customerId", qualifiedByName = "mapCustomerById")
    Image toEntity(ImageCustomerRequest imageCustomerRequest);

    List<ImageCustomerResponse> toDtoListCustomer(List<Image> images);

    @Named("mapCustomerById")
    default Customer mapCustomerById(Long customerId) {
        if (customerId == null) {
            return null;
        }
        return null;
    }
}

