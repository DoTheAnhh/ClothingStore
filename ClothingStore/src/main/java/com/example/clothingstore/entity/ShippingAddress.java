package com.example.clothingstore.entity;

import com.example.clothingstore.entity.base.PrimaryEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shipping_address")
public class ShippingAddress extends PrimaryEntity {

    @Column(name = "user_name")
    private String userName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "province_name")
    private String provinceName;

    @Column(name = "district_name")
    private String districtName;

    @Column(name = "ward_name")
    private String wardName;

    @Column(name = "address_detail")
    private String addressDetail;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
