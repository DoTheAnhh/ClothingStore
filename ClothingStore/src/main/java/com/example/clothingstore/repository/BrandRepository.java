package com.example.clothingstore.repository;

import com.example.clothingstore.entity.Brand;
import com.example.clothingstore.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
    @Query("SELECT p FROM Brand p")
    List<Brand> findAll();
}
