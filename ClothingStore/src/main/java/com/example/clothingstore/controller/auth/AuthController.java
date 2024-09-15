package com.example.clothingstore.controller.auth;

import com.example.clothingstore.config.Security.AuthService;
import com.example.clothingstore.dto.request.TokenRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<TokenRequest> signUp(@RequestBody TokenRequest signUpRequest) {
        return ResponseEntity.ok(authService.signUp(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<TokenRequest> signIn(@RequestBody TokenRequest signInRequest) {
        return ResponseEntity.ok(authService.signIn(signInRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenRequest> refreshToken(@RequestBody TokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }

    @PostMapping("/forgot-password")
    public TokenRequest forgotPassword(@RequestBody TokenRequest request) {
        return authService.forgotPassword(request.getEmail());
    }

    @PostMapping("/reset-password")
    public TokenRequest resetPassword(@RequestParam String token, @RequestBody TokenRequest request) {
        return authService.resetPassword(token, request.getPassword());
    }
}