package com.example.clothingstore.dto.product_detail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailRequest {

    private int quantity;

    private Boolean status;

    private Long colorId;

    private Long sizeId;

    private Long productId;
}

