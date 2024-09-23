package com.example.clothingstore.service;

import com.example.clothingstore.dto.type.TypeRequest;
import com.example.clothingstore.dto.type.TypeResponse;

import java.util.List;
import java.util.Optional;

public interface TypeService {

    List<TypeResponse> findAllTypes();

    Optional<TypeResponse> findTypeById(Long id);

    void insertType(TypeRequest typeRequest);

    void editType(TypeRequest typeRequest, Long id);
}
