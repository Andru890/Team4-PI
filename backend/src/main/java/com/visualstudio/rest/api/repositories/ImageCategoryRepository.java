package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.Images.ImageCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ImageCategoryRepository extends JpaRepository<ImageCategory, Long> {
    List<ImageCategory> findByOrderById();
}
