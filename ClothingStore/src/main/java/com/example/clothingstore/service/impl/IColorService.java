package com.example.clothingstore.service.impl;

import com.example.clothingstore.dto.request.ColorRequest;
import com.example.clothingstore.dto.response.ColorResponse;
import com.example.clothingstore.entity.Color;
import com.example.clothingstore.mapper.ColorMapper;
import com.example.clothingstore.repository.ColorRepository;
import com.example.clothingstore.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IColorService implements ColorService {

    @Autowired
    private ColorRepository colorRepository;

    private final ColorMapper colorMapper = ColorMapper.INSTANCE;

    @Override
    public List<ColorResponse> findAllColors() {
        List<Color> colors = colorRepository.findAll();
        return colorMapper.toDtoList(colors);
    }

    @Override
    public Optional<ColorResponse> findColorById(Long id) {
        Optional<Color> color = colorRepository.findById(id);
        return color.map(colorMapper::toDto);
    }

    @Override
    public void insertColor(ColorRequest colorRequest) {
        Color color = colorMapper.toEntity(colorRequest);
        colorRepository.save(color);
    }

    @Override
    public void editColor(ColorRequest colorRequest, Long id) {
        Optional<Color> existing = colorRepository.findById(id);
        if (existing.isPresent()) {
            Color existingColor = existing.get();
            existingColor.setColorName(colorRequest.getColorName());
            colorRepository.save(existingColor);
        }
    }
}
