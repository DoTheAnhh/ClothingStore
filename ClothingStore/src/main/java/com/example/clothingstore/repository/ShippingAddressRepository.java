package com.example.clothingstore.repository;

import com.example.clothingstore.entity.ShippingAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, Long> {

    @Query("SELECT sa FROM ShippingAddress sa WHERE sa.customer.id = :customerId")
    List<ShippingAddress> findByCustomerId(@Param("customerId") Long customerId);

}
