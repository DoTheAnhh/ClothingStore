package com.example.clothingstore.dto.brand;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BrandRequest {

    @NotNull(message = "Tên thương hiệu không được để trống")
    private String brandName;
}
