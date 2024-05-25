package com.visualstudio.rest.api.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.visualstudio.rest.api.models.entities.ProductImage;
import com.visualstudio.rest.api.repositories.ProductImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductImageService {
    private ProductImageRepository productImageRepository;

    public List<ProductImage> getAll(){
        return productImageRepository.findByOrderById();
    }

    public Optional<ProductImage> getOne(Long id){
        return productImageRepository.findById(id);
    }

    public void save(ProductImage productImage){
        productImageRepository.save(productImage);
    }

    public void delete(Long id){
        productImageRepository.deleteById(id);
    }
}
