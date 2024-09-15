package com.example.clothingstore.config.Security;

import com.example.clothingstore.config.Mail.EmailService;
import com.example.clothingstore.dto.request.TokenRequest;
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

    public TokenRequest signUp(TokenRequest registrationRequest) {
        TokenRequest resp = new TokenRequest();
        try {
            if (customerRepository.findByEmail(registrationRequest.getEmail()).isPresent()) {
                resp.setStatusCode(400);
                resp.setMessage("Email already exists");
                return resp;
            }
            Customer customer = new Customer();
            customer.setEmail(registrationRequest.getEmail());
            customer.setPassword(passwordEncoder.encode(registrationRequest.getPassword())); // Mã hóa mật khẩu
            customer.setRole(registrationRequest.getRole());
            Customer customerResult = customerRepository.save(customer);
            if (customerResult != null && customerResult.getId() > 0) {
                resp.setCustomer(customerResult);
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }


    public TokenRequest signIn(TokenRequest signInRequest) {
        TokenRequest response = new TokenRequest();
        try {
            // Tìm khách hàng bằng email
            Customer customer = customerRepository.findByEmail(signInRequest.getEmail()).orElseThrow(() ->
                    new RuntimeException("User not found with email: " + signInRequest.getEmail()));

            String passwordInDatabase = customer.getPassword();

            boolean passwordMatches = passwordEncoder.matches(signInRequest.getPassword(), passwordInDatabase);

            if (!passwordMatches) {
                passwordMatches = signInRequest.getPassword().equals(passwordInDatabase);
            }

            if (!passwordMatches) {
                response.setStatusCode(401);
                response.setMessage("Invalid credentials");
                return response;
            }

            var jwt = jwtUtils.generateToken(customer);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), customer);

            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully Sign In");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public TokenRequest refreshToken(TokenRequest refreshTokenRequest) {
        TokenRequest response = new TokenRequest();
        String ourEmail = jwtUtils.extractUsername(refreshTokenRequest.getToken());
        Customer customer = customerRepository.findByEmail(ourEmail).orElseThrow();
        if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), customer)) {
            var jwt = jwtUtils.generateToken(customer);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenRequest.getToken());
            response.setExpirationTime("24hr");
            response.setMessage("Succesfully Refresh Token");
        }
        response.setStatusCode(500);
        return response;
    }

    public TokenRequest forgotPassword(String email) {
        TokenRequest response = new TokenRequest();
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
            response.setError(e.getMessage());
        }
        return response;
    }

    private void sendResetPasswordEmail(String email, String token) {
        String resetPasswordLink = "http://localhost:5173/reset-password";
        String subject = "Password Reset Request and your token is: " + token;
        String body = "To reset your password, please click the following link: " + resetPasswordLink;

        emailService.sendEmail(email, subject, body);
    }

    public TokenRequest resetPassword(String token, String newPassword) {
        TokenRequest response = new TokenRequest();
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
