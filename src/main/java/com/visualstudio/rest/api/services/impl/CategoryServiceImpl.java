package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.entities.Category;
import com.visualstudio.rest.api.repositories.CategoryRepository;
import com.visualstudio.rest.api.services.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements ICategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Category category, Long id) {
        return null;
    }
    @Override
    public Category findById(Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
