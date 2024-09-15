package com.example.clothingstore.mapper;

import com.example.clothingstore.dto.request.SizeRequest;
import com.example.clothingstore.dto.response.SizeResponse;
import com.example.clothingstore.entity.Size;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface SizeMapper {

    SizeMapper INSTANCE = Mappers.getMapper(SizeMapper.class);

    SizeResponse toDto(Size size);

    Size toEntity(SizeRequest sizeRequest);

    List<SizeResponse> toDtoList(List<Size> sizes);

    List<Size> toEntityList(List<SizeResponse> sizeResponse);
}
