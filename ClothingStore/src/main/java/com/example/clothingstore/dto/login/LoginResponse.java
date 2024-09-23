package com.example.clothingstore.dto.login;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String email;
    private String role;
    private int statusCode;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
}
