package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.dtos.CategoryDTO;
import com.visualstudio.rest.api.models.entities.Category;
import com.visualstudio.rest.api.models.entities.Images.ImageCategory;
import com.visualstudio.rest.api.repositories.CategoryRepository;
import com.visualstudio.rest.api.repositories.ImageCategoryRepository;
import com.visualstudio.rest.api.services.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements ICategoryService {

    private final CategoryRepository categoryRepository;
    private final ImageCategoryRepository imageCategoryRepository;
    private final CloudinaryService cloudinaryService;
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
    public CategoryDTO save(MultipartFile imageFile, Category category) throws IOException {
        Optional<Map<String, String>> uploadResult = Optional.ofNullable(cloudinaryService.upload(imageFile));
        if (!uploadResult.isPresent()){
            throw new IllegalArgumentException("No se pudo guardar la imagen");
        }
        Map<String, String> result = uploadResult.get();
        ImageCategory image = new ImageCategory(
                (String) result.get("original_filename"),
                (String) result.get("url"),
                (String) result.get("public_id")
        );
        image.setCategory(category);
        image = imageCategoryRepository.save(image);
        category.setImageCategory(image);
        category = categoryRepository.save(category);
        return convertToDTO(category);
    }

    @Override
    public CategoryDTO update(MultipartFile imageFile, Category category, Long id) throws IOException {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (!optionalCategory.isPresent()){
            throw new IllegalArgumentException("Categoria no encontrada");
        }
        Category existCategory = optionalCategory.get();
        if (!imageFile.isEmpty() || imageFile != null){
            Optional<Map<String, String>> uploadResult = Optional.ofNullable(cloudinaryService.upload(imageFile));
            Map<String, String> result = uploadResult.get();
            ImageCategory image = new ImageCategory(
                    (String) result.get("original_filename"),
                    (String) result.get("url"),
                    (String) result.get("public_id")
            );
            image = imageCategoryRepository.save(image);
            existCategory.setImageCategory(image);
        }
        existCategory.setName(category.getName());
        existCategory.setDescription(category.getDescription());
        category = categoryRepository.save(existCategory);
        return convertToDTO(category);

    }
    @Override
    public CategoryDTO findById(Long id) {
        return convertToDTO(categoryRepository.findById(id).get());
    }

    @Override
    public void delete(Long id) throws IOException {
        Optional<Category> category = categoryRepository.findById(id);
        if (!category.isPresent()){
            throw new IllegalArgumentException("Categoria no encontrada");
        }
        Optional<ImageCategory> optionalImage = imageCategoryRepository.findById(id);
        if (!optionalImage.isEmpty()){
            ImageCategory imagen = optionalImage.get();
            cloudinaryService.delete(imagen.getImageId());
            imageCategoryRepository.deleteById(id);
        }
        categoryRepository.deleteById(id);
    }

    private CategoryDTO convertToDTO(Category category){
        return mapper.map(category,CategoryDTO.class);
    }
}