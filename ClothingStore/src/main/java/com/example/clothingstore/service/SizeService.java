package com.example.clothingstore.service;

import com.example.clothingstore.dto.size.SizeRequest;
import com.example.clothingstore.dto.size.SizeResponse;

import java.util.List;
import java.util.Optional;

public interface SizeService {

    List<SizeResponse> findAllSizes();

    Optional<SizeResponse> findSizeById(Long id);

    void insertSize(SizeRequest sizeRequest);

    void editSize(SizeRequest size, Long id);
}
