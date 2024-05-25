package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.entities.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> getAll();
    Category save(Category category);
    Category update(Category category, Long id);
    Category findById(Long id);
    void delete(Long id);
}
