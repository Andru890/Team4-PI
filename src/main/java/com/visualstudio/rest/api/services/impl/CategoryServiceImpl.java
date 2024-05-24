package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.dtos.CategoryDTO;
import com.visualstudio.rest.api.models.entities.Category;
import com.visualstudio.rest.api.repositories.CategoryRepository;
import com.visualstudio.rest.api.services.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements ICategoryService {

    private final CategoryRepository categoryRepository;
    private final ModelMapper mapper;

    @Override
    public List<CategoryDTO> getAll() {
        return categoryRepository
                .findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public CategoryDTO save(Category category) {
        return convertToDTO(categoryRepository.save(category));
    }

    @Override
    public CategoryDTO update(Category category, Long id) {
        return null;
    }
    @Override
    public CategoryDTO findById(Long id) {
        return convertToDTO(categoryRepository.findById(id).get());
    }

    @Override
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

    private CategoryDTO convertToDTO(Category category){
        return mapper.map(category,CategoryDTO.class);
    }
}
