package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.FavoriteProducts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteProductsRepository extends JpaRepository<FavoriteProducts, Long> {
}
