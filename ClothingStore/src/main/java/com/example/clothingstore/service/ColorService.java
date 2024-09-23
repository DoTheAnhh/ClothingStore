package com.example.clothingstore.service;

import com.example.clothingstore.dto.color.ColorRequest;
import com.example.clothingstore.dto.color.ColorResponse;

import java.util.List;
import java.util.Optional;

public interface ColorService {

    List<ColorResponse> findAllColors();

    Optional<ColorResponse> findColorById(Long id);

    void insertColor(ColorRequest colorRequest);

    void editColor(ColorRequest colorRequest, Long id);
}
