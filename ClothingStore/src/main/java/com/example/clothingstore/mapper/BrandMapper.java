package com.example.clothingstore.mapper;

import com.example.clothingstore.dto.brand.BrandRequest;
import com.example.clothingstore.dto.brand.BrandResponse;
import com.example.clothingstore.entity.Brand;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface BrandMapper {

    BrandMapper INSTANCE = Mappers.getMapper(BrandMapper.class);

    BrandResponse toDto(Brand brand);

    Brand toEntity(BrandRequest brandRequest);

    List<BrandResponse> toDtoList(List<Brand> brands);
}
