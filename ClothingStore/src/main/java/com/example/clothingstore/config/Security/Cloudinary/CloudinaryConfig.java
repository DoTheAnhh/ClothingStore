package com.example.clothingstore.config.Security.Cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dixeeejnz",
                "api_key", "854811996775597",
                "api_secret", "5JogZN5EDipkpI334K1w4IKTSS8",
                "secure", true));
    }
}

