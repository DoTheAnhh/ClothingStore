package com.example.clothingstore.entity;

import com.example.clothingstore.entity.base.PrimaryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "voucher")
public class Voucher extends PrimaryEntity {

    @Column(name = "voucher_code")
    private String voucherCode;

    @Column(name = "voucher_description")
    private String voucherDescription;

    @Column(name = "discount_amount")
    private float discountAmount;

    @Column(name = "discount_percentage")
    private int discountPercentage;

    @Column(name = "min_order_value")
    private float minOrderValue;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_eate")
    private Date endDate;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "user_limit")
    private int userLimit = 1;
}
