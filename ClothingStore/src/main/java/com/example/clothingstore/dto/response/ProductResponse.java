package com.example.clothingstore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private Long id;

    private String productCode;

    private String productName;

    private float productPrice;

    private String productDescription;

    private String brandName;

    private String typeName;

    private Date createDate;

    private Date updateDate;

    private Boolean deleted;
}
