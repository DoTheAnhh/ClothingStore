package com.example.clothingstore.listener;

import com.example.clothingstore.entity.base.PrimaryEntity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.util.Date;

public class PrimaryEntityListener {

    @PrePersist
    private void onCreate(PrimaryEntity entity) {
        entity.setCreateDate(new Date());
        entity.setUpdateDate(new Date());
    }

    @PreUpdate
    private void onUpdate(PrimaryEntity entity) {
        entity.setUpdateDate(new Date());
    }
}
