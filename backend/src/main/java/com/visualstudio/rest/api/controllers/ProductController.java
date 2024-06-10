package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.models.dtos.ProductDTO;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.services.IProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import com.visualstudio.rest.api.services.impl.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final IProductService productService;
    private final CloudinaryService cloudinaryService;

    @Operation(summary = "Create a product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create a product",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid product id", content = @Content)})
    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        //Service de imagen, guarde tambien
        return new ResponseEntity<>(productService.save(product), HttpStatus.CREATED);
    }


    @Operation(summary = "Update a product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Update a product",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid product id", content = @Content)})
    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product, @PathVariable Long productId) {
        return new ResponseEntity<>(productService.update(product,productId), HttpStatus.OK);
    }


    @Operation(summary = "Update a product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Update a product",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid product id", content = @Content)})
    @PutMapping("/{productId}/category/{categoryId}")
    public ResponseEntity<Product> updateCategoryByProduct(@PathVariable Long productId, @PathVariable Long categoryId) {
        return new ResponseEntity<>(productService.changeCategory(productId,categoryId), HttpStatus.OK);
    }

    @Operation(summary = "Found list product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a product",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))}),
            @ApiResponse(responseCode = "404", description = "Product not found", content = @Content)})
    @GetMapping
    public ResponseEntity<List<Product>> searchAll() {
        return new ResponseEntity<>(productService.getAll(), HttpStatus.OK);
    }


    @Operation(summary = "Found a product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a product",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))}),
            @ApiResponse(responseCode = "404", description = "Product not found", content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid product id", content = @Content)})
    @GetMapping("/detail/{productId}")
    public ResponseEntity<Product> detailProduct(@PathVariable Long productId) {
        return new ResponseEntity<>(productService.findById(productId), HttpStatus.OK);
    }


    @Operation(summary = "Delete a product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Deleted a product",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))}),
            @ApiResponse(responseCode = "404", description = "Product not found", content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid product id", content = @Content)})
    @DeleteMapping("/{productId}")
    // Service de imagen para borrar
    public ResponseEntity<Void> delete(@PathVariable Long productId) {
        productService.delete(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


