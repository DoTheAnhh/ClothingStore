package com.example.clothingstore.dto.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private Long id;

    private String productCode;

    private String productName;

    private String productDescription;

    private String brandName;

    private String typeName;

    private Date createDate;

    private Date updateDate;

    private List<String> imageUrls;

    private List<String> colors;

    private List<String> sizes;

    private Float firstProductPrice;
}
