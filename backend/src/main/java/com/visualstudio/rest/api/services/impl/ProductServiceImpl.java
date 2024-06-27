package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.exceptions.ResourceExistException;
import com.visualstudio.rest.api.exceptions.ResourceNotFoundException;
import com.visualstudio.rest.api.models.dtos.ProductDTO;
import com.visualstudio.rest.api.models.dtos.ReservationDTO;
import com.visualstudio.rest.api.models.dtos.ReservationProductDTO;
import com.visualstudio.rest.api.models.entities.Category;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.models.entities.ProductDetail;
import com.visualstudio.rest.api.models.entities.Reservation;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.CategoryRepository;
import com.visualstudio.rest.api.repositories.ProductDetailRepository;
import com.visualstudio.rest.api.repositories.ProductRepository;
import com.visualstudio.rest.api.repositories.ReservationRepository;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {


    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ModelMapper mapper;
    private final ProductDetailRepository productDetailRepository;

    @Override
    public List<ProductDTO> getAll() {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTOS = new ArrayList<>();
        products.forEach(p -> productDTOS.add(convertProductToDTO(p)));
        return productDTOS;
    }

    @Override
    public Product save(Product product) {
        Product newProduct = product;

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
        newProduct.setImages(newImages);

        Category category = categoryRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Categoria con id %s", product.getCategory().getId())));
        newProduct.setCategory(category);

        List<ProductDetail> characteristics = product.getCharacteristics();
        Set<Long> characteristicsIds = new HashSet<>();
        for (ProductDetail detail : characteristics) {
            characteristicsIds.add(detail.getId());
        }
        List<ProductDetail> foundCharacteristic = productDetailRepository.findByIdIn(characteristicsIds);
        newProduct.setCharacteristics(foundCharacteristic);
        Product savedProduct = productRepository.save(newProduct);

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

        List<ProductDetail> existingCharacteristics = productFound.getCharacteristics();
        List<ProductDetail> newCharacteristics = new ArrayList<>();
        for (ProductDetail productDetail : existingCharacteristics) {
            if (!existingCharacteristics.contains(productDetail)) {
                newCharacteristics.add(productDetail);
            }
        }
        productFound.setCharacteristics(newCharacteristics);

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

    private ProductDTO convertProductToDTO(Product product) {
        return mapper.map(product, ProductDTO.class);
    }

    private ReservationDTO convertReservationToDTO(Reservation reservation){
        return mapper.map(reservation, ReservationDTO.class);
    }
}
