package com.example.clothingstore.dto.refresh_token;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshTokenResponse {
    private int statusCode;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
}
