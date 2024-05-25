package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.services.IProductService;
import com.visualstudio.rest.api.services.impl.CloudinaryService;
import com.visualstudio.rest.api.services.impl.ProductImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final IProductService productService;
    private final CloudinaryService cloudinaryService;
    private final ProductImageService productImageService;

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        //Service de imagen, guarde tambien

        return new ResponseEntity<>(productService.save(product), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Product>> searchAll() {
        return new ResponseEntity<>(productService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> detailProduct(@PathVariable Long productId) {
        return new ResponseEntity<>(productService.findById(productId), HttpStatus.OK);
    }

    @DeleteMapping("/{productId}")
    // Service de imagen para borrar
    public ResponseEntity<Void> delete(@PathVariable Long productId) {
        productService.delete(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}



