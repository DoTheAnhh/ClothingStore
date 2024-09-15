package com.example.clothingstore.repository;

import com.example.clothingstore.entity.ProductDetail;
import com.example.clothingstore.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeRepository extends JpaRepository<Size, Long> {
    @Query("SELECT p FROM Size p")
    List<Size> findAll();
}
