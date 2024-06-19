package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.dtos.ProductDTO;
import com.visualstudio.rest.api.models.dtos.ReservationProductDTO;
import com.visualstudio.rest.api.models.entities.Product;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IProductService {
    List<ProductDTO> getAll();
    Product save(Product product /*Optional<List<MultipartFile>> imageFiles*/) ;
    ProductDTO update(Product product, Long id /* Optional<List<MultipartFile>> imageFiles*/) ;
    ProductDTO findById(Long id);
    ProductDTO changeCategory(Long productId, Long categoryId);
    void delete(Long id) ;
    ProductDTO preReservation(Long productId, Long userId, ReservationProductDTO reservationProductDTO);
}