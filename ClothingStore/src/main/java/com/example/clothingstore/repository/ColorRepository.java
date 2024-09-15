package com.example.clothingstore.repository;

import com.example.clothingstore.entity.Color;
import com.example.clothingstore.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {

    @Query("SELECT p FROM Color p")
    List<Color> findAll();
}
