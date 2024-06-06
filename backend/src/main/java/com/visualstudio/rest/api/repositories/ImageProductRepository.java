package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.Images.ImageProduct;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageProductRepository extends JpaRepository<ImageProduct, Long> {
    @Transactional
    List<ImageProduct> findByProductId(Long id);
}
