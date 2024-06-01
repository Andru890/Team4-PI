package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.Images.ImageProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageProductRepository extends JpaRepository<ImageProduct, Long> {
}
