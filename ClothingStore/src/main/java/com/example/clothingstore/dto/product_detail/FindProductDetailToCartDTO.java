package com.example.clothingstore.dto.product_detail;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindProductDetailToCartDTO {
    private Long colorId;
    private Long sizeId;
    private Long productId;
}
