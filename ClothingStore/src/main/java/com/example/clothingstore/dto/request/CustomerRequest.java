package com.example.clothingstore.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRequest {

    private String name;

    private int age;

    private Date birthday;

    private boolean gender;

    private String location;

    private String email;

    private String password;

    private String role;
}
