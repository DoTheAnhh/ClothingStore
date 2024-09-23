package com.example.clothingstore.config.Security;

import com.example.clothingstore.config.Mail.EmailService;
import com.example.clothingstore.dto.forgot_password.ForgotPasswordResponse;
import com.example.clothingstore.dto.login.LoginRequest;
import com.example.clothingstore.dto.refresh_token.RefreshTokenRequest;
import com.example.clothingstore.dto.login.LoginResponse;
import com.example.clothingstore.dto.refresh_token.RefreshTokenResponse;
import com.example.clothingstore.dto.register.RegisterRequest;
import com.example.clothingstore.dto.register.RegisterResponse;
import com.example.clothingstore.dto.reset_password.ResetPasswordResponse;
import com.example.clothingstore.entity.Customer;
import com.example.clothingstore.repository.CustomerRepository;
import com.example.clothingstore.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CustomerService customerService;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public RegisterResponse signUp(RegisterRequest registerRequest) {
        RegisterResponse resp = new RegisterResponse();
        try {
            if (customerRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
                resp.setStatusCode(400);
                resp.setMessage("Email already exists");
                return resp;
            }
            Customer customer = new Customer();
            customer.setEmail(registerRequest.getEmail());
            customer.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Mã hóa mật khẩu
            Customer customerResult = customerRepository.save(customer);

            var jwt = jwtUtils.generateToken(customer);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), customer);

            if (customerResult != null && customerResult.getId() > 0) {
                resp.setEmail(customer.getEmail());
                resp.setRole(customer.getRole());
                resp.setToken(jwt);
                resp.setRefreshToken(refreshToken);
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
                resp.setExpirationTime("15M");
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage(e.getMessage());
        }
        return resp;
    }


    public LoginResponse signIn(LoginRequest loginRequest) {
        LoginResponse response = new LoginResponse();
        try {
            Customer customer = customerRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() ->
                    new RuntimeException("User not found with email: " + loginRequest.getEmail()));

            String passwordInDatabase = customer.getPassword();

            boolean passwordMatches = passwordEncoder.matches(loginRequest.getPassword(), passwordInDatabase);

            if (!passwordMatches) {
                passwordMatches = loginRequest.getPassword().equals(passwordInDatabase);
            }

            if (!passwordMatches) {
                response.setStatusCode(401);
                response.setMessage("Invalid credentials");
                return response;
            }

            var jwt = jwtUtils.generateToken(customer);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), customer);

            response.setEmail(customer.getEmail());
            response.setRole(customer.getRole());
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("15M");
            response.setMessage("Successfully Sign In");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public RefreshTokenResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        RefreshTokenResponse response = new RefreshTokenResponse();
        String ourEmail = jwtUtils.extractUsername(refreshTokenRequest.getToken());
        Customer customer = customerRepository.findByEmail(ourEmail).orElseThrow();
        if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), customer)) {
            var jwt = jwtUtils.generateToken(customer);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenRequest.getToken());
            response.setExpirationTime("24hr");
            response.setMessage("Succesfully Refresh Token");
        } else {
            response.setStatusCode(500);
        }
        return response;
    }

    public ForgotPasswordResponse forgotPassword(String email) {
        ForgotPasswordResponse response = new ForgotPasswordResponse();
        try {
            Customer customer = customerRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Email không tồn tại"));

            // Tạo token mới
            String token = jwtUtils.generateToken(customer);

            // Cập nhật token vào cơ sở dữ liệu
            customer.setResetToken(token.trim());
            customerRepository.save(customer);

            // Gửi email reset password
            sendResetPasswordEmail(customer.getEmail(), token);

            response.setStatusCode(200);
            response.setMessage("Email đặt lại mật khẩu đã được gửi.");
            response.setToken(token);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    private void sendResetPasswordEmail(String email, String token) {
        String resetPasswordLink = "http://localhost:5173/reset-password";
        String subject = "Password Reset Request and your token is: " + token;
        String body = "To reset your password, please click the following link: " + resetPasswordLink;

        emailService.sendEmail(email, subject, body);
    }

    public ResetPasswordResponse resetPassword(String token, String newPassword) {
        ResetPasswordResponse response = new ResetPasswordResponse();
        try {
            String cleanedToken = token.trim().replace("\n", "");

            Optional<Customer> optionalCustomer = customerRepository.findByResetToken(cleanedToken);

            if (optionalCustomer.isEmpty()) {
                response.setStatusCode(400);
                response.setToken(token);
                response.setMessage("Token không hợp lệ.");
                return response;
            }

            Customer customer = optionalCustomer.get();

            // Cập nhật mật khẩu và xóa token
            customer.setPassword(passwordEncoder.encode(newPassword));
            customer.setResetToken(null);
            customerRepository.save(customer);

            response.setStatusCode(200);
            response.setMessage("Đặt lại mật khẩu thành công.");
        } catch (RuntimeException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }
        return response;
    }
}
