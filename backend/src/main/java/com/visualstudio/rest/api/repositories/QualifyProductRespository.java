package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.QualifyProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QualifyProductRespository extends JpaRepository<QualifyProduct, Long> {

}
