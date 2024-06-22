package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.models.entities.QualifyProduct;
import com.visualstudio.rest.api.services.IQualifyProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/qualify")
@RequiredArgsConstructor
public class QualifyProductController {
    private final IQualifyProductService qualifyProductService;

    @GetMapping
    public ResponseEntity<List<QualifyProduct>> allQualifyList() {
        return ResponseEntity.ok(qualifyProductService.getAll());
    }

    @GetMapping("{qualifyProductId}")
    public ResponseEntity<QualifyProduct> oneQualification(@PathVariable Long qualifyProductId){
        return ResponseEntity.ok(qualifyProductService.getOne(qualifyProductId));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<QualifyProduct>> qualifyPerProduct(@PathVariable Long productId){
        return ResponseEntity.ok(qualifyProductService.qualifyPerProduct(productId));
    }

    @GetMapping("/user/{userEmail}")
    public ResponseEntity<List<QualifyProduct>> qualifyPerUser(@PathVariable String userEmail){
        return ResponseEntity.ok(qualifyProductService.qualifyPerUser(userEmail));
    }

    @PostMapping("/user/{userEmail}/product/{productId}")
    public ResponseEntity<QualifyProduct> saveQualify(@PathVariable String userEmail, @PathVariable Long productId, @RequestParam Long reservationId, @RequestBody QualifyProduct qualifyProduct){
        return ResponseEntity.ok(qualifyProductService.saveQualify(userEmail, productId, reservationId, qualifyProduct.getRating(), qualifyProduct.getComent()));
    }
    @PutMapping("/user/{userEmail}/product/{productId}")
    public ResponseEntity<QualifyProduct> updateQualify(@PathVariable String userEmail, @PathVariable Long productId, @RequestBody QualifyProduct qualifyProduct){
        return ResponseEntity.ok(qualifyProductService.updateQualify(userEmail, productId, qualifyProduct.getRating(), qualifyProduct.getComent()));
    }
    @DeleteMapping("/user/{userEmail}/product/{productId}")
    public ResponseEntity<Void> deleteQualify(@PathVariable String userEmail, @PathVariable Long productId){
        qualifyProductService.deleteQualify(userEmail, productId);
        return ResponseEntity.noContent().build();
    }
}
