package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.exceptions.ResourceExistException;
import com.visualstudio.rest.api.models.entities.Category;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.repositories.CategoryRepository;
import com.visualstudio.rest.api.repositories.ProductRepository;
import com.visualstudio.rest.api.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {


    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public Product save(Product product) {

        List<Product> products = productRepository.findAll();
        for(Product foundProduct: products){
            if(foundProduct.getName().equalsIgnoreCase(product.getName())){
                throw new ResourceExistException("El nombre ya esta en uso");
            }
        }
        Category category = categoryRepository.findById(product.getCategory().getId()).get();
        product.setCategory(category);
        return productRepository.save(product);
    }

    @Override
    public Product update(Product product, Long id) {
        return null;
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id).get();
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
