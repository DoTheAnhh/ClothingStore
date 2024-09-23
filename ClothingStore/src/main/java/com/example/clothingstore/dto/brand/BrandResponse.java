package com.example.clothingstore.dto.brand;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BrandResponse {
    private Long id;

    private String brandName;

    private Date createDate;

    private Date updateDate;
}
