package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.FavoriteProducts;
import com.visualstudio.rest.api.models.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface FavoriteProductsRepository extends JpaRepository<FavoriteProducts, Long> {
    List<Product> findByUserId(Long userId);
}
