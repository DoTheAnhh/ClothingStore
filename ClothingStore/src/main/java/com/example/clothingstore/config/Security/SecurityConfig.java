package com.example.clothingstore.config.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private CustomerDetailService customerDetailService;

    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(req ->
                        req
                                //ALL
                                .requestMatchers("/auth/**").permitAll()

                                .requestMatchers("/product").permitAll()
                                .requestMatchers("/product/*").permitAll()
                                .requestMatchers("/product/type/*").permitAll()

                                .requestMatchers("/product-detail").permitAll()
                                .requestMatchers("/product-detail/*").permitAll()
                                .requestMatchers("/product-detail/find-product-detail-to-cart").permitAll()
                                .requestMatchers("/product-detail/find-sizes-by-color-in-product-detail/*").permitAll()

                                .requestMatchers("/brand").permitAll()
                                .requestMatchers("/brand/*").permitAll()

                                .requestMatchers("/color").permitAll()
                                .requestMatchers("/color/*").permitAll()

                                .requestMatchers("/image/product-detail/*").permitAll()
                                .requestMatchers("/image/customer/*").permitAll()
                                .requestMatchers("/image/color/*/product/*").permitAll()

                                .requestMatchers("/size").permitAll()
                                .requestMatchers("/size/*").permitAll()

                                .requestMatchers("/type").permitAll()
                                .requestMatchers("/type/*").permitAll()

                                .requestMatchers("/customer").permitAll()
                                .requestMatchers("/customer/*").permitAll()
                                .requestMatchers("/customer/edit-reset-token-for-customer/*").permitAll()
                                .requestMatchers("/customer/check-password").permitAll()

                                .requestMatchers("/cart").permitAll()
                                .requestMatchers("/cart/add-product-to-cart").permitAll()
                                .requestMatchers("/cart/update-quantity").permitAll()
                                .requestMatchers("/cart/delete-product-detail-in-cart/*").permitAll()
                                .requestMatchers("/cart/count").permitAll()

                                .requestMatchers("/shipping-address/customer/*").permitAll()
                                .requestMatchers("/shipping-address/*").permitAll()

                                .requestMatchers("/v3/api-docs/**", "/v3/api-docs.yaml", "/swagger-ui.html", "/swagger-ui/**").permitAll()

                                //ADMIN
                                .requestMatchers("/product/insert").hasAnyAuthority("ADMIN")
                                .requestMatchers("/product/edit/*").hasAnyAuthority("ADMIN")

                                .requestMatchers("/product-detail/insert").hasAnyAuthority("ADMIN")
                                .requestMatchers("/product-detail/edit/*").hasAnyAuthority("ADMIN")
                                .requestMatchers("/product-detail/update-qrcode").hasAnyAuthority("ADMIN")

                                .requestMatchers("/brand/insert").hasAnyAuthority("ADMIN")
                                .requestMatchers("/brand/edit/*").hasAnyAuthority("ADMIN")

                                .requestMatchers("/color/insert").hasAnyAuthority("ADMIN")
                                .requestMatchers("/color/edit/*").hasAnyAuthority("ADMIN")

                                .requestMatchers("/image/upload-image-product-detail").hasAnyAuthority("ADMIN")

                                .requestMatchers("/image/upload-image-customer").hasAnyAuthority("ADMIN")

                                .requestMatchers("/size/insert").hasAnyAuthority("ADMIN")
                                .requestMatchers("/size/edit/*").hasAnyAuthority("ADMIN")

                                .requestMatchers("/type/insert").hasAnyAuthority("ADMIN")
                                .requestMatchers("/type/edit/*").hasAnyAuthority("ADMIN")

                                .requestMatchers("/customer/insert").hasAnyAuthority("ADMIN")
                                .requestMatchers("/customer/edit/*").hasAnyAuthority("ADMIN")

                                .anyRequest().authenticated())
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider()).addFilterBefore(
                        jwtAuthFilter, UsernamePasswordAuthenticationFilter.class
                );
        return httpSecurity.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(customerDetailService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
