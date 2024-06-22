package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.entities.QualifyProduct;

import java.util.List;
import java.util.Optional;

public interface IQualifyProductService {
    List<QualifyProduct> getAll();
    Optional<QualifyProduct> getOne(Long id);
    List<QualifyProduct> qualifyPerProduct(Long productId);
    List<QualifyProduct> qualifyPerUser(Long userId);
    QualifyProduct saveQualify(Long userId, Long productId, Long reservationId, Integer rating, String coment);
    QualifyProduct updateQualify(Long userId, Long productId, Integer rating, String coment);
    void deleteQualify(Long qualifyProductId);

}