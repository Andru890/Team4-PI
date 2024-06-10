package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.dtos.ProductDetailDTO;
import com.visualstudio.rest.api.models.entities.ProductDetail;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IProductDetailService {
    List<ProductDetailDTO> getAll();
    ProductDetailDTO save(ProductDetail productDetail, Long productId);
    ProductDetailDTO update(ProductDetail productDetail, Long id);
    ProductDetailDTO findById(Long Id);
    void delete(Long id);
    List<ProductDetailDTO> findAllCharacteristicByProduct(Long productId);
}
