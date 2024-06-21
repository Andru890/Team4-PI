package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.models.entities.QualifyProduct;
import com.visualstudio.rest.api.models.entities.Reservation;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.ProductRepository;
import com.visualstudio.rest.api.repositories.QualifyProductRespository;
import com.visualstudio.rest.api.repositories.ReservationRepository;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IQualifyProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QualifyProductServiceImpl implements IQualifyProductService {
    private final QualifyProductRespository qualifyProductRespository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ReservationRepository reservationRepository;
    @Override
    public List<QualifyProduct> getAll(){

        return qualifyProductRespository.findAll();
    }
    @Override
    public QualifyProduct getOne(Long id){

        return qualifyProductRespository.findById(id).get();
    }
    @Override
    public List<QualifyProduct> qualifyPerProduct(Long productId){
        Product product = productRepository.findById(productId).get();
        List<QualifyProduct> qualifyList = product.getQualifyProducts();
        return qualifyList;
    }
    @Override
    public List<QualifyProduct> qualifyPerUser(Long userId){
        User user = userRepository.findById(userId).get();
        List<QualifyProduct> qualifyList = user.getQualifyProducts();
        return qualifyList;
    }
    @Override
    public QualifyProduct saveQualify(Long userId, Long productId, Long reservationId, Integer rating, String coment){
        User user = userRepository.findById(userId).get();
        Product product = productRepository.findById(productId).get();
        Reservation reservation = reservationRepository.findById(reservationId).get();

        QualifyProduct newQualify = new QualifyProduct();
        newQualify.setUser(user);
        newQualify.setProduct(product);
        newQualify.setReservation(reservation);
        newQualify.setRating(rating);
        newQualify.setComent(coment);
        return qualifyProductRespository.save(newQualify);
    }
    @Override
    public QualifyProduct updateQualify(Long userId, Long productId, Integer rating, String coment){
        User user = userRepository.findById(userId).get();
        Product product = productRepository.findById(productId).get();
        QualifyProduct qualifyProduct = qualifyProductRespository.findByUserAndProduct(user, product);
        qualifyProduct.setRating(rating);
        qualifyProduct.setComent(coment);
        qualifyProductRespository.save(qualifyProduct);
        return qualifyProduct;
    }
    @Override
    public void deleteQualify(Long qualifyProductId) {
        qualifyProductRespository.deleteById(qualifyProductId);
    }
}
