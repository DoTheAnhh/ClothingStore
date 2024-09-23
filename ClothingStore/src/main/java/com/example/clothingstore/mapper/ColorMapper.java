package com.example.clothingstore.mapper;

import com.example.clothingstore.dto.color.ColorRequest;
import com.example.clothingstore.dto.color.ColorResponse;
import com.example.clothingstore.entity.Color;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ColorMapper {

    ColorMapper INSTANCE = Mappers.getMapper(ColorMapper.class);

    ColorResponse toDto(Color color);

    Color toEntity(ColorRequest colorRequest);

    List<ColorResponse> toDtoList(List<Color> colors);

    List<Color> toEntityList(List<ColorResponse> colorResponse);
}
