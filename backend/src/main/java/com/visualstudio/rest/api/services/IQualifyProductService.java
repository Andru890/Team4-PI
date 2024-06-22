package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.entities.QualifyProduct;

import java.util.List;

public interface IQualifyProductService {
    List<QualifyProduct> getAll();
    QualifyProduct getOne(Long id);
    List<QualifyProduct> qualifyPerProduct(Long productId);
    List<QualifyProduct> qualifyPerUser(String userEmail);
    QualifyProduct saveQualify(String userEmail, Long productId, Long reservationId, Integer rating, String coment);
    QualifyProduct updateQualify(String userEmail, Long productId, Integer rating, String coment);
    void deleteQualify(String userEmail, Long productId);

}
