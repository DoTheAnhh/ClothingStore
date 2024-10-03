package com.example.clothingstore.dto.product;

import com.example.clothingstore.dto.color.ColorDTO;
import com.example.clothingstore.dto.size.SizeDTO;
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

    private List<ColorDTO> colors;

    private List<SizeDTO> sizes;

    private Float firstProductPrice;
}
