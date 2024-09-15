package com.example.clothingstore.service;

import com.example.clothingstore.dto.request.SizeRequest;
import com.example.clothingstore.dto.request.TypeRequest;
import com.example.clothingstore.dto.response.SizeResponse;
import com.example.clothingstore.dto.response.TypeResponse;

import java.util.List;
import java.util.Optional;

public interface TypeService {

    List<TypeResponse> findAllTypes();

    Optional<TypeResponse> findTypeById(Long id);

    void insertType(TypeRequest typeRequest);

    void editType(TypeRequest typeRequest, Long id);
}
