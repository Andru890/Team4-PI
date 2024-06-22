package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.exceptions.ResourceExistException;
import com.visualstudio.rest.api.exceptions.ResourceNotFoundException;
import com.visualstudio.rest.api.models.dtos.ProductDTO;
import com.visualstudio.rest.api.models.dtos.ReservationDTO;
import com.visualstudio.rest.api.models.dtos.ReservationProductDTO;
import com.visualstudio.rest.api.models.entities.*;
import com.visualstudio.rest.api.repositories.*;
import com.visualstudio.rest.api.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {


    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ModelMapper mapper;
    private final ProductDetailRepository productDetailRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final QualifyProductRespository qualifyProductRespository;

    @Override
    public List<ProductDTO> getAll() {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTOS = new ArrayList<>();
        products.forEach(p -> productDTOS.add(convertProductToDTO(p)));
        return productDTOS;
    }

    @Override
    public Product save(Product product) {

        List<Product> products = productRepository.findAll();
        for (Product foundProduct : products) {
            if (foundProduct.getName().equalsIgnoreCase(product.getName())) {
                throw new ResourceExistException("El nombre ya esta en uso");
            }
        }

        List<String> urlImages = product.getImages();
        List<String> newImages = new ArrayList<>();
        for (String url : urlImages) {
            newImages.add(url);
        }
        product.setImages(newImages);

        Category category = categoryRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Categoria con id %s", product.getCategory().getId())));
        product.setCategory(category);

        Product savedProduct = productRepository.save(product);

        List<ProductDetail> characteristics = product.getCharacteristics();

        characteristics.forEach(c -> {
            ProductDetail characteristic = ProductDetail
                    .builder()
                    .characteristic(c.getCharacteristic())
                    .product(savedProduct)
                    .build();
            productDetailRepository.save(characteristic);
        });
        return savedProduct;
    }

    @Override
    public ProductDTO update(Product product, Long id) {

        Product productFound = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Producto con id %s", id)));

        productFound.setName(product.getName());
        productFound.setDescription(product.getDescription());
        productFound.setPrice(product.getPrice());
        productFound.setStock(product.getStock());

        List<String> urlImages = product.getImages();
        List<String> newImages = new ArrayList<>();
        for (String url : urlImages) {
            newImages.add(url);
        }
        productFound.setImages(newImages);


        return convertProductToDTO(productRepository.save(productFound));
    }

    @Override
    public ProductDTO findById(Long id) {
        return convertProductToDTO(productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Producto con id %s", id))));
    }

    @Override
    public ProductDTO changeCategory(Long productId, Long categoryId) {
        Product productFound = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Producto con id %s", productId)));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Categoria con id %s", categoryId)));
        productFound.setCategory(category);
        productRepository.save(productFound);
        return convertProductToDTO(productFound);
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public ProductDTO preReservation(Long productId, Long userId, ReservationProductDTO reservationProductDTO) {

        Product productFound = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Producto con id %s", productId)));

        productFound.setDateIn(reservationProductDTO.getDateIn());
        productFound.setDateOut(reservationProductDTO.getDateOut());
        productFound.setReserved(true);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Usuario con id %s", userId)));

        Reservation reservation = Reservation
                .builder()
                .user(user)
                .products(List.of(productFound))
                .status("reserved")
                .build();

        reservationRepository.save(reservation);

        return convertProductToDTO(productRepository.save(productFound));
    }

    private ProductDTO convertProductToDTO(Product product) {
        return mapper.map(product, ProductDTO.class);
    }

    private ReservationDTO convertReservationToDTO(Reservation reservation){
        return mapper.map(reservation, ReservationDTO.class);
    }

    public void saveQualifyProduct(QualifyProduct qualifyProduct){
        qualifyProductRespository.save(qualifyProduct);
    }

    public double getRatingProduct(Long productId){

        List<QualifyProduct> qualifyProduct = qualifyProductRespository.findByProductId(productId);
        return qualifyProduct.stream().mapToDouble(QualifyProduct::getRating).average().orElse(0.0);

    }
}
