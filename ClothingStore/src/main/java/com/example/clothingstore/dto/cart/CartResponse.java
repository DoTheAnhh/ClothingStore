package com.example.clothingstore.dto.cart;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartResponse {

    private Long cartId;

    private Long productDetailId;

    private int quantity;

    private float totalPrice;

    private String voucherCode;

    private String productName;

    private float productPrice;

    private String sizeName;

    private String colorName;

    private String imageUrl;
}
