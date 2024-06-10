package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.exceptions.ResourceNotFoundException;
import com.visualstudio.rest.api.models.dtos.ProductDetailDTO;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.models.entities.ProductDetail;
import com.visualstudio.rest.api.repositories.ProductDetailRepository;
import com.visualstudio.rest.api.repositories.ProductRepository;
import com.visualstudio.rest.api.services.IProductDetailService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ProductDetailServiceImpl implements IProductDetailService {

    private final ProductDetailRepository productDetailRepository;
    private final ProductRepository productRepository;
    private final ModelMapper mapper;
    @Override
    public List<ProductDetailDTO> getAll() {
        return productDetailRepository
                .findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public ProductDetailDTO save(ProductDetail productDetail, Long productId){

        Product productFound = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Producto Detalle con id %s", productId)));
        productDetail.setProduct(productFound);
        productDetail = productDetailRepository.save(productDetail);
        return convertToDTO(productDetail);
    }

    @Override
    public ProductDetailDTO update(ProductDetail productDetail, Long id) {
        ProductDetail productDetailFound = productDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Producto Detalle con id %s", id)));
        productDetailFound.setCharacteristic(productDetail.getCharacteristic());
        return convertToDTO(productDetailRepository.save(productDetailFound));
    }

    @Override
    public ProductDetailDTO findById(Long id) {
        return convertToDTO(productDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Producto Detalle con id %s", id))));
    }

    @Override
    public void delete(Long id) {
        productDetailRepository.deleteById(id);
    }

    @Override
    public List<ProductDetailDTO> findAllCharacteristicByProduct(Long productId) {
        return productDetailRepository.findByProductId(productId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    private ProductDetailDTO convertToDTO(ProductDetail productDetail){
        return mapper.map(productDetail, ProductDetailDTO.class);
    }
}
