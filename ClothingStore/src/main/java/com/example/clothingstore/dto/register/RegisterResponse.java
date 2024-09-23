package com.example.clothingstore.dto.register;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterResponse {
    private String email;
    private String role;
    private int statusCode;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
}
