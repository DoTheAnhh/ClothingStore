package com.example.clothingstore.config.Cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public Map<String, Object> upload(MultipartFile file) {
        try {
            // Chuyển đổi MultipartFile thành byte array
            byte[] fileBytes = file.getBytes();
            // Upload lên Cloudinary
            Map<String, Object> data = cloudinary.uploader().upload(fileBytes, ObjectUtils.emptyMap());
            return data;
        } catch (IOException io) {
            throw new RuntimeException("Image upload failed", io);
        }
    }
}

