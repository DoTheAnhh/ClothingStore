package com.example.clothingstore.entity;

import com.example.clothingstore.entity.base.PrimaryEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product")
public class Product extends PrimaryEntity {

    @Column(name = "product_code")
    @NotNull(message = "Mã sản phẩm không được để trống")
    private String productCode;

    @Column(name = "product_name")
    @NotNull(message = "Tên sản phẩm không được để trống")
    private String productName;

    @Column(name = "product_price")
    @NotNull(message = "Giá sản phẩm không được để trống")
    private float productPrice;

    @Column(name = "product_description")
    private String productDescription;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "brand_id")
    @NotNull(message = "Thương hiệu không được để trống")
    private Brand brand;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_id")
    @NotNull(message = "Thể loại không được để trống")
    private Type type;
}
