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
public class TypeResponse {
    private Long id;

    private String typeName;

    private Date createDate;

    private Date updateDate;
}
