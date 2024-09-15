package com.example.clothingstore.mapper;

import com.example.clothingstore.dto.request.TypeRequest;
import com.example.clothingstore.dto.response.TypeResponse;
import com.example.clothingstore.entity.Type;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface TypeMapper {

    TypeMapper INSTANCE = Mappers.getMapper(TypeMapper.class);

    TypeResponse toDto(Type type);

    Type toEntity(TypeRequest typeRequest);

    List<TypeResponse> toDtoList(List<Type> types);

    List<Type> toEntityList(List<TypeResponse> typeResponses);
}
