package com.example.clothingstore.service;

import com.example.clothingstore.dto.image.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ImageService {
    List<ImageProductDetailResponse> getImagesByProductDetailId(Long productDetailId);

    void uploadImageProductDetail(ImageProductDetailRequest imageProductDetailRequest);

    List<ImageCustomerResponse> getImagesByCustomerId(Long customerId);

    void uploadImageCustomer(ImageCustomerRequest imageCustomerRequest);

    List<String> findImageUrlsByColorIdAndProductId(Long colorId, Long productId);
}
