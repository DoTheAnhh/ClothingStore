package com.example.clothingstore.controller;

import com.example.clothingstore.dto.request.SizeRequest;
import com.example.clothingstore.dto.response.SizeResponse;
import com.example.clothingstore.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/size")
public class SizeRestController {

    @Autowired
    private SizeService sizeService;

    @GetMapping
    public List<SizeResponse> findAllSize() {
        return sizeService.findAllSizes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SizeResponse> findSizeById(@PathVariable Long id) {
        Optional<SizeResponse> sizeResponse = sizeService.findSizeById(id);
        return sizeResponse.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/insert")
    public void insertSize(@RequestBody SizeRequest sizeRequest) {
        sizeService.insertSize(sizeRequest);
    }

    @PutMapping("/edit/{id}")
    public void editSize(@PathVariable Long id, @RequestBody SizeRequest sizeRequest) {
        sizeService.editSize(sizeRequest, id);
    }
}
