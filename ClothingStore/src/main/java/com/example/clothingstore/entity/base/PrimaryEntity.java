package com.example.clothingstore.entity.base;

import com.example.clothingstore.listener.PrimaryEntityListener;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(PrimaryEntityListener.class)
public class PrimaryEntity {

    @Id
    @Column(updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "update_date")
    private Date updateDate;

    @Column(name = "deleted")
    private Boolean deleted;
}
