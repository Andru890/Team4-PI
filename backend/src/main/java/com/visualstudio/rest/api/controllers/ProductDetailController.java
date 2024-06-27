package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.models.dtos.ProductDetailDTO;
import com.visualstudio.rest.api.models.entities.ProductDetail;
import com.visualstudio.rest.api.services.IProductDetailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/product-detail")
@RequiredArgsConstructor
public class ProductDetailController {

    private final IProductDetailService productDetailService;

    @Operation(summary = "Create a productDetail")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create a productDetail",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ProductDetail.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid productDetail id", content = @Content)})
    @PostMapping
    public ResponseEntity<ProductDetailDTO> addProductDetail(@RequestBody ProductDetail productDetail)  {
        return new ResponseEntity<>(productDetailService.save(productDetail), HttpStatus.CREATED);
    }


    @Operation(summary = "Update a productDetail")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Update a productDetail",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ProductDetail.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid productDetail id", content = @Content)})
    @PutMapping("/{productDetailId}")
    public ResponseEntity<ProductDetailDTO> updateProductDetail(@RequestBody ProductDetail productDetail, @PathVariable Long productDetailId) {
        return new ResponseEntity<>(productDetailService.update(productDetail, productDetailId), HttpStatus.OK);
    }

    @Operation(summary = "Found list productDetail")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a productDetail",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ProductDetail.class))}),
            @ApiResponse(responseCode = "404", description = "ProductDetail not found", content = @Content)})
    @GetMapping
    public ResponseEntity<List<ProductDetailDTO>> searchAll() {
        return new ResponseEntity<>(productDetailService.getAll(), HttpStatus.OK);
    }

    /*@Operation(summary = "Found list productDetail")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a productDetail",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ProductDetail.class))}),
            @ApiResponse(responseCode = "404", description = "ProductDetail not found", content = @Content)})
    @GetMapping("/product-characteristic/{productId}")
    public ResponseEntity<List<ProductDetailDTO>> searchAllByProduct(@PathVariable Long productId) {
        return new ResponseEntity<>(productDetailService.findAllCharacteristicByProduct(productId), HttpStatus.OK);
    }*/


    @Operation(summary = "Found a productDetail")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a productDetail",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ProductDetail.class))}),
            @ApiResponse(responseCode = "404", description = "ProductDetail not found", content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid productDetail id", content = @Content)})
    @GetMapping("/{productDetailId}")
    public ResponseEntity<ProductDetailDTO> detailProductDetail(@PathVariable Long productDetailId) {
        return new ResponseEntity<>(productDetailService.findById(productDetailId), HttpStatus.OK);
    }


    @Operation(summary = "Delete a productDetail")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Deleted a productDetail",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = ProductDetail.class))}),
            @ApiResponse(responseCode = "404", description = "ProductDetail not found", content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid productDetail id", content = @Content)})
    @DeleteMapping("/{productDetailId}")
    // Service de imagen para borrar
    public ResponseEntity<Void> delete(@PathVariable Long productDetailId)  {
        productDetailService.delete(productDetailId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


