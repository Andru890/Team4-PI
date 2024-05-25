package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.entities.Product;

import java.util.List;

public interface IProductService {
    List<Product> getAll();
    Product save(Product product);
    Product update(Product product, Long id);
    Product findById(Long id);
    Product changeCategory(Long productId, Long categoryId);
    void delete(Long id);

}
