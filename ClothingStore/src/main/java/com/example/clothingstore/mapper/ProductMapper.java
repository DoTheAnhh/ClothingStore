package com.example.clothingstore.mapper;

import com.example.clothingstore.dto.color.ColorDTO;
import com.example.clothingstore.dto.product.ProductRequest;
import com.example.clothingstore.dto.product.ProductResponse;
import com.example.clothingstore.dto.size.SizeDTO;
import com.example.clothingstore.entity.Image;
import com.example.clothingstore.entity.Product;
import com.example.clothingstore.entity.ProductDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mapping(source = "brand.brandName", target = "brandName")
    @Mapping(source = "type.typeName", target = "typeName")
    @Mapping(target = "imageUrls", expression = "java(mapAllImageUrls(product))")
    @Mapping(target = "colors", expression = "java(mapAllColors(product))")
    @Mapping(target = "sizes", expression = "java(mapAllSizes(product))")
    @Mapping(target = "firstProductPrice", expression = "java(mapFirstProductPrice(product))")
    ProductResponse toDto(Product product);

    @Mapping(source = "brandId", target = "brand.id")
    @Mapping(source = "typeId", target = "type.id")
    Product toEntity(ProductRequest productRequest);

    List<ProductResponse> toDtoList(List<Product> products);

    default List<String> mapAllImageUrls(Product product) {
        List<String> imageUrls = new ArrayList<>();
        if (product.getProductDetail() != null) {
            for (ProductDetail detail : product.getProductDetail()) {
                if (detail.getImages() != null) {
                    for (Image image : detail.getImages()) {
                        imageUrls.add(image.getImageUrl());
                    }
                }
            }
        }
        return imageUrls;
    }

    default Float mapFirstProductPrice(Product product) {
        return product.getProductDetail().stream()
                .filter(detail -> detail.getProductPrice() != null) // Kiểm tra nếu giá sản phẩm không null
                .map(ProductDetail::getProductPrice) // Lấy giá sản phẩm
                .findFirst() // Lấy giá đầu tiên
                .orElse(null); // Trả về null nếu không có giá
    }

    default List<SizeDTO> mapAllSizes(Product product) {
        return product.getProductDetail().stream()
                .filter(detail -> detail.getSize() != null && detail.getQuantity() > 0)
                .map(detail -> new SizeDTO(detail.getSize().getId(), detail.getSize().getSizeName()))
                .distinct()
                .collect(Collectors.toList());
    }

    default List<ColorDTO> mapAllColors(Product product) {
        return product.getProductDetail().stream()
                .filter(detail -> detail.getColor() != null && detail.getQuantity() > 0)
                .map(detail -> new ColorDTO(detail.getColor().getId(), detail.getColor().getColorName()))
                .distinct()
                .collect(Collectors.toList());
    }
}