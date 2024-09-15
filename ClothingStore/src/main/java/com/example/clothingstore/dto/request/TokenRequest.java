package com.example.clothingstore.dto.request;

import com.example.clothingstore.entity.Customer;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenRequest {
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    private String email;
    private String role;
    private String password;
    private Customer customer;
    private boolean rememberMe;
}
