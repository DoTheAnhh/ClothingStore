package com.example.clothingstore.dto.customer;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CustomerResponse {

    private Long id;

    private String name;

    private int age;

    private Date birthday;

    private boolean gender;

    private String location;

    private String email;

    private String password;

    private String role;

    private Date createDate;

    private Date updateDate;
}
