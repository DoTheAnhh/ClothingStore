package com.example.clothingstore.service.impl;

import com.example.clothingstore.config.Cloudinary.CloudinaryService;
import com.example.clothingstore.dto.image.*;
import com.example.clothingstore.entity.Customer;
import com.example.clothingstore.entity.Image;
import com.example.clothingstore.entity.ProductDetail;
import com.example.clothingstore.mapper.ImageMapper;
import com.example.clothingstore.repository.ImageRepository;
import com.example.clothingstore.service.ImageService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class IImageService implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CloudinaryService cloudinaryService;


    private final ImageMapper imageMapper = ImageMapper.INSTANCE;

    @Override
    public List<ImageProductDetailResponse> getImagesByProductDetailId(Long productDetailId) {
        List<Image> images = imageRepository.findImagesByProductDetail(productDetailId);
        return imageMapper.toDtoList(images);
    }

    @Transactional
    @Override
    public void uploadImageProductDetail(ImageProductDetailRequest imageProductDetailRequest) {
        if (imageProductDetailRequest.getFile() == null || imageProductDetailRequest.getFile().isEmpty()) {
            throw new IllegalArgumentException("File must be provided");
        }

        // Tải ảnh lên Cloudinary
        Map<String, Object> uploadResult = cloudinaryService.upload(imageProductDetailRequest.getFile());
        String imageUrl = (String) uploadResult.get("url");

        // Tìm hình ảnh theo productDetailId
        List<Image> existingImages = imageRepository.findImagesByProductDetail(imageProductDetailRequest.getProductDetailId());

        if (!existingImages.isEmpty()) {
            // Cập nhật hình ảnh đầu tiên trong danh sách
            Image imageToUpdate = existingImages.get(0); // Cập nhật hình ảnh đầu tiên
            imageToUpdate.setImageUrl(imageUrl);
            imageRepository.save(imageToUpdate);
        } else {
            // Nếu không có hình ảnh nào, tạo hình ảnh mới
            Image newImage = new Image();
            newImage.setImageUrl(imageUrl);
            if (imageProductDetailRequest.getProductDetailId() != null) {
                ProductDetail productDetail = new ProductDetail();
                productDetail.setId(imageProductDetailRequest.getProductDetailId());
                newImage.setProductDetail(productDetail);
            }
            imageRepository.save(newImage);
        }
    }


    @Override
    public List<ImageCustomerResponse> getImagesByCustomerId(Long customerId) {
        List<Image> images = imageRepository.findImagesByCustomer(customerId);
        return imageMapper.toDtoListCustomer(images);
    }

    @Transactional
    @Override
    public void uploadImageCustomer(ImageCustomerRequest imageCustomerRequest) {
        if (imageCustomerRequest.getFile() == null || imageCustomerRequest.getFile().isEmpty()) {
            throw new IllegalArgumentException("File must be provided");
        }

        // Tải ảnh lên Cloudinary
        Map<String, Object> uploadResult = cloudinaryService.upload(imageCustomerRequest.getFile());
        String imageUrl = (String) uploadResult.get("url");

        // Tìm hình ảnh theo customerId
        List<Image> existingImages = imageRepository.findImagesByCustomer(imageCustomerRequest.getCustomerId());

        if (!existingImages.isEmpty()) {
            // Cập nhật hình ảnh đầu tiên trong danh sách
            Image imageToUpdate = existingImages.get(0); // Cập nhật hình ảnh đầu tiên
            imageToUpdate.setImageUrl(imageUrl);
            imageRepository.save(imageToUpdate);
        } else {
            // Nếu không có hình ảnh nào, tạo hình ảnh mới
            Image newImage = new Image();
            newImage.setImageUrl(imageUrl);
            if (imageCustomerRequest.getCustomerId() != null) {
                Customer customer = new Customer();
                customer.setId(imageCustomerRequest.getCustomerId());
                newImage.setCustomer(customer);
            }
            imageRepository.save(newImage);
        }
    }

    @Override
    public List<String> findImageUrlsByColorIdAndProductId(Long colorId, Long productId) {
        // Lấy danh sách URL hình ảnh từ repository
        List<String> imageUrls = imageRepository.findImageUrlsByColorIdAndProductId(colorId, productId);

        // Nếu không có hình ảnh nào, có thể trả về một danh sách rỗng
        return imageUrls.isEmpty() ? Collections.emptyList() : imageUrls;
    }

}
