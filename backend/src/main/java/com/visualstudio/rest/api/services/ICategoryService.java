package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.dtos.CategoryDTO;
import com.visualstudio.rest.api.models.entities.Category;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ICategoryService {
    List<CategoryDTO> getAll();
    CategoryDTO save(MultipartFile imageFile, Category category) throws IOException;
    CategoryDTO update(Category category, Long id) throws IOException;
    CategoryDTO findById(Long id);
    void delete(Long id) throws IOException;
}