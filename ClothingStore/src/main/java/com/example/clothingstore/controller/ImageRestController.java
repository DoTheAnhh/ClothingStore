package com.example.clothingstore.controller;

import com.example.clothingstore.dto.image.ImageRequest;
import com.example.clothingstore.dto.image.ImageResponse;
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

    @GetMapping("/product-detail/{productDetailId}")
    public List<ImageResponse> findImageByProductDetailId(@PathVariable Long productDetailId) {
        return imageService.getImagesByProductDetailId(productDetailId);
    }

    @PostMapping("/upload")
    public ResponseEntity<Void> addImage(@RequestParam("file") MultipartFile file,
                                         @RequestParam("productDetailId") Long productDetailId) throws IOException {
        ImageRequest imageRequest = new ImageRequest();
        imageRequest.setFile(file);
        imageRequest.setProductDetailId(productDetailId);

        imageService.insertImage(imageRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/edit")
    public ResponseEntity<Void> editImage(@RequestParam("file") MultipartFile file,
                                          @RequestParam("productDetailId") Long productDetailId) {
        ImageRequest imageRequest = new ImageRequest();
        imageRequest.setFile(file);
        imageRequest.setProductDetailId(productDetailId);

        imageService.updateImage(imageRequest);
        return ResponseEntity.ok().build();
    }


}
