package com.example.clothingstore.dto.forgot_password;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgotPasswordResponse {
    private int statusCode;
    private String message;
    private String token;
}
