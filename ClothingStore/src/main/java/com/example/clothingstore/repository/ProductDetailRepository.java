package com.example.clothingstore.repository;

import com.example.clothingstore.entity.ProductDetail;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {

    @Query("SELECT p FROM ProductDetail p")
    List<ProductDetail> findAll();

    @Query(value = "select * from product_detail pd where pd.id = :id", nativeQuery = true)
    Optional<ProductDetail> findProductDetailById(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("update ProductDetail pd set pd.QRcode = :qrcode where pd.id = :id")
    void updateQRCode(Long id, String qrcode);
}
