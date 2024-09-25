package com.example.clothingstore.config.Initial;

import com.example.clothingstore.entity.Customer;
import com.example.clothingstore.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CustomerDataInitializer {

    @Bean
    CommandLineRunner initDatabase(CustomerRepository customerRepository) {
        return args -> {
            if (customerRepository.count() == 0) {
                Customer admin = new Customer();
                admin.setName("Admin");
                admin.setEmail("Admin");
                admin.setPassword("123");
                admin.setRole("ADMIN");

                customerRepository.save(admin);

                Customer user = new Customer();
                user.setName("User");
                user.setEmail("User");
                user.setPassword("123");
                user.setRole("USER");

                customerRepository.save(user);
            }
        };
    }
}
