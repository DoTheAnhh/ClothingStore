package com.example.clothingstore.repository;

import com.example.clothingstore.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    @Query(value = "SELECT * FROM Image i WHERE i.product_detail_id = :productDetailId", nativeQuery = true)
    List<Image> findImagesByProductDetail(@Param("productDetailId") Long productDetailId);

    @Modifying
    @Query(value = "UPDATE image i SET i.image_url = :imageUrl WHERE i.product_detail_id = :productDetailId", nativeQuery = true)
    void updateProductDetail(@Param("imageUrl") String imageUrl, @Param("productDetailId") Long productDetailId);
}
