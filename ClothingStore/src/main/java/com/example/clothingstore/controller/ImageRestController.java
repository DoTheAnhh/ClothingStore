package com.example.clothingstore.controller;

import com.example.clothingstore.dto.image.ImageCustomerRequest;
import com.example.clothingstore.dto.image.ImageCustomerResponse;
import com.example.clothingstore.dto.image.ImageProductDetailRequest;
import com.example.clothingstore.dto.image.ImageProductDetailResponse;
import com.example.clothingstore.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/image")
public class ImageRestController {

    @Autowired
    private ImageService imageService;

    //Product detail
    @GetMapping("/product-detail/{productDetailId}")
    public List<ImageProductDetailResponse> findImageByProductDetailId(@PathVariable Long productDetailId) {
        return imageService.getImagesByProductDetailId(productDetailId);
    }

    @PostMapping("/upload-image-product-detail")
    public ResponseEntity<Void> uploadImageProductDetail(@RequestParam("file") MultipartFile file,
                                          @RequestParam("productDetailId") Long productDetailId) {
        ImageProductDetailRequest imageProductDetailRequest = new ImageProductDetailRequest();
        imageProductDetailRequest.setFile(file);
        imageProductDetailRequest.setProductDetailId(productDetailId);

        imageService.uploadImageProductDetail(imageProductDetailRequest);
        return ResponseEntity.ok().build();
    }

    //Customer
    @GetMapping("/customer/{customerId}")
    public List<ImageCustomerResponse> findImageByCustomerId(@PathVariable Long customerId) {
        return imageService.getImagesByCustomerId(customerId);
    }

    @PostMapping("/upload-image-customer")
    public ResponseEntity<Void> uploadImageCustomer(@RequestParam("file") MultipartFile file,
                                                 @RequestParam("customerId") Long customerId) {
        ImageCustomerRequest imageCustomerRequest = new ImageCustomerRequest();
        imageCustomerRequest.setFile(file);
        imageCustomerRequest.setCustomerId(customerId);

        imageService.uploadImageCustomer(imageCustomerRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/color/{colorId}/product/{productId}")
    public ResponseEntity<List<String>> getImageUrlsByColorAndProduct(
            @PathVariable Long colorId,
            @PathVariable Long productId) {

        List<String> imageUrls = imageService.findImageUrlsByColorIdAndProductId(colorId, productId);

        // Trả về danh sách URL hình ảnh
        return ResponseEntity.ok(imageUrls);
    }
}
