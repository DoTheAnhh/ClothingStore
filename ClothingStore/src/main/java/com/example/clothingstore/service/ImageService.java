package com.example.clothingstore.service;

import com.example.clothingstore.dto.request.ImageRequest;
import com.example.clothingstore.dto.response.ImageResponse;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    List<ImageResponse> getImagesByProductDetailId(Long productDetailId);

    void insertImage(ImageRequest imageRequest) throws IOException;

    void updateImage(ImageRequest imageRequest);
}
