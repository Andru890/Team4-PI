package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {
}
