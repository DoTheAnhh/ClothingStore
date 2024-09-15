package com.example.clothingstore.controller;

import com.example.clothingstore.dto.request.SizeRequest;
import com.example.clothingstore.dto.request.TypeRequest;
import com.example.clothingstore.dto.response.SizeResponse;
import com.example.clothingstore.dto.response.TypeResponse;
import com.example.clothingstore.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/type")
public class TypeRestController {

    @Autowired
    private TypeService typeService;

    @GetMapping
    public List<TypeResponse> getAllTypes() {
        return typeService.findAllTypes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TypeResponse> findSizeById(@PathVariable Long id) {
        Optional<TypeResponse> typeResponse = typeService.findTypeById(id);
        return typeResponse.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/insert")
    public void insertSize(@RequestBody TypeRequest typeRequest) {
        typeService.insertType(typeRequest);
    }

    @PutMapping("/edit/{id}")
    public void editSize(@PathVariable Long id, @RequestBody TypeRequest typeRequest) {
        typeService.editType(typeRequest, id);
    }
}
