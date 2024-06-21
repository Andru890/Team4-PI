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
    public ResponseEntity<QualifyProduct> oneQualify(@PathVariable Long qualifyProductId){
        return ResponseEntity.ok(qualifyProductService.getOne(qualifyProductId));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<QualifyProduct>> qualifyPerProduct(@PathVariable Long productId){
        return ResponseEntity.ok(qualifyProductService.qualifyPerProduct(productId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<QualifyProduct>> qualifyPerUser(@PathVariable Long userId){
        return ResponseEntity.ok(qualifyProductService.qualifyPerUser(userId));
    }

    @PostMapping("/user/{userId}/product/{productId}")
    public ResponseEntity<QualifyProduct> saveQualify(@PathVariable Long userId, @PathVariable Long productId, @RequestParam Long reservationId, @RequestBody QualifyProduct qualifyProduct){
        return ResponseEntity.ok(qualifyProductService.saveQualify(userId, productId, reservationId, qualifyProduct.getRating(), qualifyProduct.getComent()));
    }
    @PutMapping("/user/{userId}/product/{productId}")
    public ResponseEntity<QualifyProduct> updateQualify(@PathVariable Long userId, @PathVariable Long productId, @RequestBody QualifyProduct qualifyProduct){
        return ResponseEntity.ok(qualifyProductService.updateQualify(userId, productId, qualifyProduct.getRating(), qualifyProduct.getComent()));
    }
    @DeleteMapping("/{qualifyProductId}")
    public ResponseEntity<Void> deleteQualify(@PathVariable Long qualifyProductId){
        qualifyProductService.deleteQualify(qualifyProductId);
        return ResponseEntity.noContent().build();
    }
}
