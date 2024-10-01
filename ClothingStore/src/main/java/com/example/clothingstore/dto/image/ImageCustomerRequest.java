package com.example.clothingstore.dto.image;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ImageCustomerRequest {

    private MultipartFile file;

    private Long customerId;
}
