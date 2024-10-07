package com.example.clothingstore.repository;

import com.example.clothingstore.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    @Query(value = "SELECT * FROM Image i WHERE i.product_detail_id = :productDetailId", nativeQuery = true)
    List<Image> findImagesByProductDetail(@Param("productDetailId") Long productDetailId);

    @Query(value = "SELECT * FROM Image i WHERE i.customer_id = :customerId", nativeQuery = true)
    List<Image> findImagesByCustomer(@Param("customerId") Long customerId);

    @Query("SELECT i.imageUrl FROM Image i JOIN ProductDetail pd ON i.productDetail.id = pd.id WHERE pd.color.id = :colorId AND pd.product.id = :productId")
    List<String> findImageUrlsByColorIdAndProductId(@Param("colorId") Long colorId, @Param("productId") Long productId);

}
