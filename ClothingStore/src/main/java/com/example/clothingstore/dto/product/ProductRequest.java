package com.example.clothingstore.dto.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {

    private String productCode;

    private String productName;

    private float productPrice;

    private String productDescription;

    private Long brandId;

    private Long typeId;
}
