package com.example.clothingstore.service.impl;

import com.example.clothingstore.dto.size.SizeRequest;
import com.example.clothingstore.dto.size.SizeResponse;
import com.example.clothingstore.entity.Size;
import com.example.clothingstore.mapper.SizeMapper;
import com.example.clothingstore.repository.SizeRepository;
import com.example.clothingstore.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ISizeService implements SizeService {

    @Autowired
    private SizeRepository sizeRepository;

    private final SizeMapper sizeMapper = SizeMapper.INSTANCE;

    @Override
    public List<SizeResponse> findAllSizes() {
        List<Size> sizes = sizeRepository.findAll();
        return sizeMapper.toDtoList(sizes);
    }

    @Override
    public Optional<SizeResponse> findSizeById(Long id) {
        Optional<Size> size = sizeRepository.findById(id);
        return size.map(sizeMapper::toDto);
    }

    @Override
    public void insertSize(SizeRequest sizeRequest) {
        Size size = sizeMapper.toEntity(sizeRequest);
        sizeRepository.save(size);
    }

    @Override
    public void editSize(SizeRequest sizeRequest, Long id) {
        Optional<Size> existing = sizeRepository.findById(id);
        if (existing.isPresent()) {
            Size existingSize = existing.get();
            existingSize.setSizeName(sizeRequest.getSizeName());
            sizeRepository.save(existingSize);
        }
    }
}
