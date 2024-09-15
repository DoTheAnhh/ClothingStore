package com.example.clothingstore.mapper;

import com.example.clothingstore.dto.request.ImageRequest;
import com.example.clothingstore.dto.response.ImageResponse;
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

    ImageResponse toDto(Image image);

    @Mapping(target = "productDetail", source = "productDetailId", qualifiedByName = "mapProductDetailById")
    Image toEntity(ImageRequest imageRequest);

    List<ImageResponse> toDtoList(List<Image> images);

    List<Image> toEntityList(List<ImageRequest> imageRequests);

    @Named("mapProductDetailById")
    default ProductDetail mapProductDetailById(Long productDetailId) {
        if (productDetailId == null) {
            return null;
        }
        return null;
    }
}

