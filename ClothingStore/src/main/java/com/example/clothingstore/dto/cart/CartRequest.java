package com.example.clothingstore.dto.cart;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartRequest {

    private Long customerId;

    private Long productDetailId;

    private int quantity;

    private float productPrice;
}
