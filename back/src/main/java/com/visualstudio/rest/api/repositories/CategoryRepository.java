package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
