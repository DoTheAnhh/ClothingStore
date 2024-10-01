package com.example.clothingstore.entity;

import com.example.clothingstore.entity.base.PrimaryEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product_detail")
public class ProductDetail extends PrimaryEntity {

    @Column(name = "quantity")
    @NotNull(message = "Số lượng không được để trống")
    private int quantity;

    @Column(name = "product_price")
    @NotNull(message = "Giá sản phẩm không được để trống")
    private Float productPrice;

    @Column(name = "QRcode", columnDefinition = "LONGTEXT")
    private String QRcode;

    @Column(name = "status")
    private Boolean status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "color_id")
    @NotNull(message = "Màu sắc không được để trống")
    private Color color;

    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull(message = "Kích thước không được để trống")
    @JoinColumn(name = "size_id")
    private Size size;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    @NotNull(message = "Sản phẩm không được để trống")
    private Product product;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "productDetail")
    private List<Image> images;
}
