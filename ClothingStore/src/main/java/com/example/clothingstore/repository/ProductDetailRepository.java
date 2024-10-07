package com.example.clothingstore.repository;

import com.example.clothingstore.dto.size.SizeDTO;
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

    @Query(value = "select * from product_detail pd where pd.id = :id", nativeQuery = true)
    Optional<ProductDetail> findProductDetailById(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("update ProductDetail pd set pd.QRcode = :qrcode where pd.id = :id")
    void updateQRCode(Long id, String qrcode);

    @Query("select pd.id from ProductDetail pd where pd.color.id = :colorId and pd.size.id = :sizeId and pd.product.id = :productId")
    Long findProductDetailAddToCart(@Param("colorId") Long colorId, @Param("sizeId") Long sizeId, @Param("productId") Long productId);

    @Query("SELECT new com.example.clothingstore.dto.size.SizeDTO(s.id, s.sizeName) " +
            "FROM ProductDetail pd JOIN pd.size s " +
            "WHERE pd.color.id = :colorId")
    List<SizeDTO> findSizeIdByColorIdInProductDetail(@Param("colorId") Long colorId);
}
