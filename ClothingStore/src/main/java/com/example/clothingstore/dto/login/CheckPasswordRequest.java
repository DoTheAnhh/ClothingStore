package com.example.clothingstore.dto.login;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckPasswordRequest {
    private String email;
    private String password;
}
