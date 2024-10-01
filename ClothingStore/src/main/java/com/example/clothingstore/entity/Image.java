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
@Table(name = "image")
public class Image extends PrimaryEntity {

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_detail_id")
    private ProductDetail productDetail;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
