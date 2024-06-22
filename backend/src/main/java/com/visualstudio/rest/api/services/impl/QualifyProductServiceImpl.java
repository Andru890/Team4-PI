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

import java.time.LocalDate;
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
    public List<QualifyProduct> qualifyPerUser(String userEmail){
        User user = userRepository.findByEmail(userEmail);
        List<QualifyProduct> qualifyList = user.getQualifyProducts();
        return qualifyList;
    }
    @Override
    public QualifyProduct saveQualify(String userEmail, Long productId, Long reservationId, Integer rating, String coment){
        User user = userRepository.findByEmail(userEmail);
        if (user == null){
            throw new IllegalArgumentException("El usuario no existe");
        }
        Reservation reservation = reservationRepository.findById(reservationId).get();
        if (reservation == null){
            throw new IllegalArgumentException("La reserva no existe");
        }

        Product product = productRepository.findById(productId).get();
        if (product == null // Falta hacer una validación para los productos de la reserva ){
            throw new IllegalArgumentException("El producto no existe");
        }

        if (reservation.getUser().getId() == user.getId()){
            QualifyProduct newQualify = new QualifyProduct();
            newQualify.setUser(user);
            newQualify.setProduct(product);
            newQualify.setReservation(reservation);
            newQualify.setRating(rating);
            newQualify.setComent(coment);
            newQualify.setDate(LocalDate.now());
            return qualifyProductRespository.save(newQualify);
        } else {
            throw new IllegalArgumentException("El usuario no puede calificar la reserva");
        }
    }
    @Override
    public QualifyProduct updateQualify(String userEmail, Long productId, Integer rating, String coment){
        User user = userRepository.findByEmail(userEmail);
        if (user == null){
            throw new IllegalArgumentException("El usuario no existe");
        }
        Product product = productRepository.findById(productId).get();
        if (product == null){
            throw new IllegalArgumentException("El producto no existe");
        }
        QualifyProduct qualifyProduct = qualifyProductRespository.findByUserAndProduct(user, product);
        qualifyProduct.setRating(rating);
        qualifyProduct.setComent(coment);
        qualifyProductRespository.save(qualifyProduct);
        return qualifyProduct;
    }
    @Override
    public void deleteQualify(String userEmail, Long productId) {
        User user = userRepository.findByEmail(userEmail);
        if (user == null){
            throw new IllegalArgumentException("El usuario no existe");
        }
        Product product = productRepository.findById(productId).get();
        if (product == null){
            throw new IllegalArgumentException("El producto no existe");
        }
        QualifyProduct qualifyProduct = qualifyProductRespository.findByUserAndProduct(user, product);
        qualifyProductRespository.delete(qualifyProduct);
    }
}
