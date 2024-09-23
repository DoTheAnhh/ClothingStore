package com.example.clothingstore.controller;

import com.example.clothingstore.dto.color.ColorRequest;
import com.example.clothingstore.dto.color.ColorResponse;
import com.example.clothingstore.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/color")
public class ColorRestController {

    @Autowired
    private ColorService colorService;

    @GetMapping
    public List<ColorResponse> findAllColors() {
        return colorService.findAllColors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ColorResponse> findColorById(@PathVariable Long id) {
        Optional<ColorResponse> colorResponse = colorService.findColorById(id);
        return colorResponse.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/insert")
    public void insertSize(@RequestBody ColorRequest colorRequest) {
        colorService.insertColor(colorRequest);
    }

    @PutMapping("/edit/{id}")
    public void editSize(@PathVariable Long id, @RequestBody ColorRequest colorRequest) {
        colorService.editColor(colorRequest, id);
    }
}
