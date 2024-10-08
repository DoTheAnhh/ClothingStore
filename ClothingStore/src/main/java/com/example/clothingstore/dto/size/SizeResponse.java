package com.example.clothingstore.dto.size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SizeResponse {
    private Long id;

    private String sizeName;

    private Date createDate;

    private Date updateDate;
}
