package com.example.clothingstore.service.impl;

import com.example.clothingstore.config.Security.Cloudinary.CloudinaryService;
import com.example.clothingstore.dto.image.ImageRequest;
import com.example.clothingstore.dto.image.ImageResponse;
import com.example.clothingstore.entity.Image;
import com.example.clothingstore.entity.ProductDetail;
import com.example.clothingstore.mapper.ImageMapper;
import com.example.clothingstore.repository.ImageRepository;
import com.example.clothingstore.service.ImageService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class IImageService implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CloudinaryService cloudinaryService;


    private final ImageMapper imageMapper = ImageMapper.INSTANCE;

    @Override
    public List<ImageResponse> getImagesByProductDetailId(Long productDetailId) {
        List<Image> images = imageRepository.findImagesByProductDetail(productDetailId);
        return imageMapper.toDtoList(images);
    }

    @Transactional
    @Override
    public void insertImage(ImageRequest imageRequest) throws IOException {
        // Tải ảnh lên Cloudinary
        Map<String, Object> uploadResult = cloudinaryService.upload(imageRequest.getFile());
        String imageUrl = (String) uploadResult.get("url");

        Image image = new Image();
        image.setImageUrl(imageUrl);
        if (imageRequest.getProductDetailId() != null) {
            ProductDetail productDetail = new ProductDetail();
            productDetail.setId(imageRequest.getProductDetailId());
            image.setProductDetail(productDetail);
        }

        imageRepository.save(image);
    }

    @Transactional
    @Override
    public void updateImage(ImageRequest imageRequest) {
        if (imageRequest.getFile() == null || imageRequest.getFile().isEmpty()) {
            throw new IllegalArgumentException("File must be provided");
        }
        Map<String, Object> uploadResult = cloudinaryService.upload(imageRequest.getFile());
        String imageUrl = (String) uploadResult.get("url");

        List<Image> existingImages = imageRepository.findImagesByProductDetail(imageRequest.getProductDetailId());

        if (existingImages.isEmpty()) {
            Image newImage = new Image();
            newImage.setImageUrl(imageUrl);
            if (imageRequest.getProductDetailId() != null) {
                ProductDetail productDetail = new ProductDetail();
                productDetail.setId(imageRequest.getProductDetailId());
                newImage.setProductDetail(productDetail);
            }
            imageRepository.save(newImage);
        } else {
            for (Image image : existingImages) {
                image.setImageUrl(imageUrl);
                imageRepository.save(image);
            }
        }
    }
}
