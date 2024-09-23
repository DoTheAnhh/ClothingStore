package com.example.clothingstore.service;

import com.example.clothingstore.dto.image.ImageRequest;
import com.example.clothingstore.dto.image.ImageResponse;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    List<ImageResponse> getImagesByProductDetailId(Long productDetailId);

    void insertImage(ImageRequest imageRequest) throws IOException;

    void updateImage(ImageRequest imageRequest);
}
