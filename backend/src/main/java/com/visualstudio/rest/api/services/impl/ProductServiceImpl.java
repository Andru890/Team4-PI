package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.exceptions.ResourceExistException;
import com.visualstudio.rest.api.exceptions.ResourceNotFoundException;
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
        Category category = categoryRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Categoria con id %s", product.getCategory().getId())));
        product.setCategory(category);
        return productRepository.save(product);
    }

    @Override
    public Product update(Product product, Long id) {
        Product productFound = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Producto con id %s", id)));
        productFound.setName(product.getName());
        productFound.setDescription(product.getDescription());
        productFound.setPrice(product.getPrice());
        return productRepository.save(productFound);
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Producto con id %s", id)));
    }

    @Override
    public Product changeCategory(Long productId, Long categoryId) {
        Product productFound = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Producto con id %s", productId)));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Categoria con id %s", categoryId)));
        productFound.setCategory(category);
        productRepository.save(productFound);
        return productFound;
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
