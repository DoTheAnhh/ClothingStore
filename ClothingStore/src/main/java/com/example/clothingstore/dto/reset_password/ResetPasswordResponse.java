package com.example.clothingstore.dto.reset_password;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordResponse {

    private int statusCode;

    private String message;

    private String token;
}
