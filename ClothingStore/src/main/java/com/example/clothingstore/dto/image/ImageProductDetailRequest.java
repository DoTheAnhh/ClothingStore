package com.example.clothingstore.dto.image;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageProductDetailRequest {

    private MultipartFile file;

    private Long productDetailId;
}
