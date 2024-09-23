package com.example.clothingstore.dto.product_detail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailResponse {

    private Long id;

    private int quantity;

    private String QRcode;

    private Boolean status;

    private String colorName;

    private String sizeName;

    private String productName;

    private Date createDate;

    private Date updateDate;

    private Boolean deleted;
}
