package com.example.clothingstore.entity;

import com.example.clothingstore.entity.base.PrimaryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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
@Table(name = "type")
public class Type extends PrimaryEntity {

    @Column(name = "type_name")
    @NotNull(message = "Tên thể loại không được để trống")
    private String typeName;
}
