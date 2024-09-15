package com.example.clothingstore.service.impl;

import com.example.clothingstore.dto.request.TypeRequest;
import com.example.clothingstore.dto.response.TypeResponse;
import com.example.clothingstore.entity.Size;
import com.example.clothingstore.entity.Type;
import com.example.clothingstore.mapper.TypeMapper;
import com.example.clothingstore.repository.TypeRepository;
import com.example.clothingstore.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ITypeService implements TypeService {

    @Autowired
    private TypeRepository typeRepository;

    private final TypeMapper typeMapper = TypeMapper.INSTANCE;

    @Override
    public List<TypeResponse> findAllTypes() {
        List<Type> types = typeRepository.findAll();
        return typeMapper.toDtoList(types);
    }

    @Override
    public Optional<TypeResponse> findTypeById(Long id) {
        Optional<Type> type = typeRepository.findById(id);
        return type.map(typeMapper::toDto);
    }

    @Override
    public void insertType(TypeRequest typeRequest) {
        Type type = typeMapper.toEntity(typeRequest);
        typeRepository.save(type);
    }

    @Override
    public void editType(TypeRequest typeRequest, Long id) {
        Optional<Type> existing = typeRepository.findById(id);
        if (existing.isPresent()) {
            Type existingType = existing.get();
            existingType.setTypeName(typeRequest.getTypeName());
            typeRepository.save(existingType);
        }
    }
}
