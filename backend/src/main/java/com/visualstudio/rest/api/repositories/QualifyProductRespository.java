package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.models.entities.QualifyProduct;
import com.visualstudio.rest.api.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QualifyProductRespository extends JpaRepository<QualifyProduct, Long> {
    QualifyProduct findByUser(User user);
    QualifyProduct findByUserAndProduct(User user, Product product);
}
