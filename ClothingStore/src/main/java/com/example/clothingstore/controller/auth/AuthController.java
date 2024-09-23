package com.example.clothingstore.controller.auth;

import com.example.clothingstore.config.Security.AuthService;
import com.example.clothingstore.dto.forgot_password.ForgotPasswordRequest;
import com.example.clothingstore.dto.forgot_password.ForgotPasswordResponse;
import com.example.clothingstore.dto.login.LoginRequest;
import com.example.clothingstore.dto.refresh_token.RefreshTokenRequest;
import com.example.clothingstore.dto.login.LoginResponse;
import com.example.clothingstore.dto.refresh_token.RefreshTokenResponse;
import com.example.clothingstore.dto.register.RegisterRequest;
import com.example.clothingstore.dto.register.RegisterResponse;
import com.example.clothingstore.dto.reset_password.ResetPasswordResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<RegisterResponse> signUp(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.signUp(registerRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<LoginResponse> signIn(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.signIn(loginRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshTokenResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }

    @PostMapping("/forgot-password")
    public ForgotPasswordResponse forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        return authService.forgotPassword(forgotPasswordRequest.getEmail());
    }

    @PostMapping("/reset-password")
    public ResetPasswordResponse resetPassword(@RequestParam String token, @RequestParam String password) {
        return authService.resetPassword(token, password);
    }
}