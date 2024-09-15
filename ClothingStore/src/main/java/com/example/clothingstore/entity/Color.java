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
@Table(name = "color")
public class Color extends PrimaryEntity {

    @Column(name = "color_name")
    @NotNull(message = "Tên màu sắc không được để trống")
    private String colorName;
}
