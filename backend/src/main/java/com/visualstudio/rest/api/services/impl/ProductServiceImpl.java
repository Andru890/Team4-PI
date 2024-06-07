package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.exceptions.ResourceExistException;
import com.visualstudio.rest.api.models.dtos.ProductDTO;
import com.visualstudio.rest.api.models.entities.Category;
import com.visualstudio.rest.api.models.entities.Images.ImageProduct;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.repositories.CategoryRepository;
import com.visualstudio.rest.api.repositories.ImageProductRepository;
import com.visualstudio.rest.api.repositories.ProductRepository;
import com.visualstudio.rest.api.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {


    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ModelMapper mapper;
    private final CloudinaryService cloudinaryService;
    private final ImageProductRepository imageProductRepository;


    @Override
    public List<ProductDTO> getAll() {
        return productRepository
                .findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public ProductDTO save(Product product, Optional<List<MultipartFile>> imageFiles) throws IOException {

        List<Product> products = productRepository.findAll();
        for(Product foundProduct: products){
            if(foundProduct.getName().equalsIgnoreCase(product.getName())){
                throw new ResourceExistException("El nombre ya esta en uso");
            }
        }
        if (!imageFiles.isEmpty()) {
            List<MultipartFile> newImage = imageFiles.get();
            List<ImageProduct> images = new ArrayList<>();
            for (MultipartFile imageFile : newImage) {
                Map<String, String> uploadResult = cloudinaryService.upload(imageFile);
                ImageProduct image = new ImageProduct(
                        uploadResult.get("original_filename"),
                        uploadResult.get("url"),
                        uploadResult.get("public_id")
                );
                image.setProduct(product);
                images.add(imageProductRepository.save(image));
            }
            product.setImages(images);
        }
        Category category = categoryRepository.findById(product.getCategory().getId()).get();
        product.setCategory(category);
        Product newProduct = productRepository.save(product);

        return convertToDTO(newProduct);
    }

    @Override
    public ProductDTO update(Product product, Long id, Optional<List<MultipartFile>> imageFiles) throws IOException {
        Product productFound = productRepository.findById(id).get();
        if (!imageFiles.isEmpty()) {
            List<MultipartFile> newImage = imageFiles.get();
            List<ImageProduct> images = new ArrayList<>();
            for (MultipartFile imageFile : newImage) {
                Map<String, String> uploadResult = cloudinaryService.upload(imageFile);
                ImageProduct image = new ImageProduct(
                        uploadResult.get("original_filename"),
                        uploadResult.get("url"),
                        uploadResult.get("public_id")
                );
                image.setProduct(product);
                images.add(imageProductRepository.save(image));
            }
            product.setImages(images);
        }
        productFound.setName(product.getName());
        productFound.setDescription(product.getDescription());
        productFound.setPrice(product.getPrice());
        productFound.setStock(product.getStock());
        Product updatedProduct = productRepository.save(productFound);
        return convertToDTO(updatedProduct);
    }

    @Override
    public ProductDTO findById(Long id) {
        Product productFound = productRepository.findById(id).get();
        return convertToDTO(productFound);
    }

    @Override
    public ProductDTO changeCategory(Long productId, Long categoryId) {
        Product productFound = productRepository.findById(productId).get();
        Category category = categoryRepository.findById(categoryId).get();
        productFound.setCategory(category);
        productRepository.save(productFound);
        return convertToDTO(productFound);
    }

    @Override
    public void delete(Long id) throws IOException {
        List<ImageProduct> foundImages = imageProductRepository.findByProductId(id);
        if (!foundImages.isEmpty()){
            for(ImageProduct image: foundImages){
                cloudinaryService.delete(image.getImageId());
            }
        }
        productRepository.deleteById(id);
    }

    private ProductDTO convertToDTO(Product product){
        return mapper.map(product, ProductDTO.class);
        /*ProductDTO productDTO = mapper.map(product,ProductDTO.class);
        mapper.forSourceMember(Product::getImages)
                .mapOntoTarget(ProductDTO::setImageProductUrl, list -> {
                    List<String> imageUrls = new ArrayList<>();
                    for (ImageProduct image : list){
                        imageUrls.add(image.getUrl());
                    }
                    return imageUrls;
                });
                return productDTO;*/
    }

}
