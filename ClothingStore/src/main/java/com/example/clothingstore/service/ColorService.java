package com.example.clothingstore.service;

import com.example.clothingstore.dto.request.ColorRequest;
import com.example.clothingstore.dto.response.ColorResponse;

import java.util.List;
import java.util.Optional;

public interface ColorService {

    List<ColorResponse> findAllColors();

    Optional<ColorResponse> findColorById(Long id);

    void insertColor(ColorRequest colorRequest);

    void editColor(ColorRequest colorRequest, Long id);
}
