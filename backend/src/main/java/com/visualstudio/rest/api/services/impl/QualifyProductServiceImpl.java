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

    public List<QualifyProduct> getAll(){
        return qualifyProductRespository.findAll();
    }

    public QualifyProduct getOne(Long id){
        return qualifyProductRespository.findById(id).get();
    }

    public List<QualifyProduct> qualifyPerProduct(Long productId){
        Product product = productRepository.findById(productId).get();
        List<QualifyProduct> qualifyList = product.getQualifyProducts();
        return qualifyList;
    }

    public List<QualifyProduct> qualifyPerUser(Long userId){
        User user = userRepository.findById(userId).get();
        List<QualifyProduct> qualifyList = user.getQualifyProducts();
        return qualifyList;
    }

    public QualifyProduct saveQualify(Long userId, Long productId, Long reservationId, Integer qualify, String coment){
        User user = userRepository.findById(userId).get();
        Product product = productRepository.findById(productId).get();
        Reservation reservation = reservationRepository.findById(reservationId).get();

        QualifyProduct newQualify = new QualifyProduct();
        newQualify.setUser(user);
        newQualify.setProduct(product);
        newQualify.setReservation(reservation);
        newQualify.setQualify(qualify);
        newQualify.setComent(coment);
        return qualifyProductRespository.save(newQualify);
    }

}
