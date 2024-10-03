package com.example.clothingstore.dto.cart;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartResponse {

    private String name;

    private int quantity;

    private float totalPrice;

    private String voucherCode;

    private String productName;

    private float productPrice;
}
