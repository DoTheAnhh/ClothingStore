package com.example.clothingstore.service;

import com.example.clothingstore.dto.image.ImageCustomerRequest;
import com.example.clothingstore.dto.image.ImageCustomerResponse;
import com.example.clothingstore.dto.image.ImageProductDetailRequest;
import com.example.clothingstore.dto.image.ImageProductDetailResponse;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    List<ImageProductDetailResponse> getImagesByProductDetailId(Long productDetailId);

    void uploadImageProductDetail(ImageProductDetailRequest imageProductDetailRequest);

    List<ImageCustomerResponse> getImagesByCustomerId(Long customerId);

    void uploadImageCustomer(ImageCustomerRequest imageCustomerRequest);
}
