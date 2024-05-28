package com.visualstudio.rest.api.services;

<<<<<<< HEAD
import com.visualstudio.rest.api.dto.Entrada.CategoryDTO;
=======
import com.visualstudio.rest.api.models.dtos.CategoryDTO;
>>>>>>> origin/back-end
import com.visualstudio.rest.api.models.entities.Category;

import java.util.List;

public interface ICategoryService {
    List<CategoryDTO> getAll();
    CategoryDTO save(Category category);
    CategoryDTO update(Category category, Long id);
    CategoryDTO findById(Long id);
    void delete(Long id);
}