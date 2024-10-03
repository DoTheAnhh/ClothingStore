package com.example.clothingstore.repository;

import com.example.clothingstore.dto.product.ProductResponse;
import com.example.clothingstore.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p")
    List<Product> findAll();

    @Query(value = "SELECT p from Product p where p.type.id = :typeId")
    List<Product> findProductByTypeId (Long typeId);
}
