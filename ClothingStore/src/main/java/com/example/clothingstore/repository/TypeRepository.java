package com.example.clothingstore.repository;

import com.example.clothingstore.entity.ProductDetail;
import com.example.clothingstore.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {
    @Query("SELECT p FROM Type p")
    List<Type> findAll();
}
