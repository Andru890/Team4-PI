package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.exceptions.ResourceNotFoundException;
import com.visualstudio.rest.api.models.entities.QualifyProduct;
import com.visualstudio.rest.api.services.IQualifyProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<Optional<QualifyProduct>> oneQualify(@PathVariable Long qualifyProductId){
        return ResponseEntity.ok(Optional.ofNullable(qualifyProductService.getOne(qualifyProductId)
                .orElseThrow(() -> new ResourceNotFoundException("La calificación no existe"))));

    }

    @GetMapping("4")
    public ResponseEntity<List<QualifyProduct>> qualifyPerProduct(@PathVariable Long productId){
        return ResponseEntity.ok(qualifyProductService.qualifyPerProduct(productId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<QualifyProduct>> qualifyPerUser(@PathVariable Long userId){
        return ResponseEntity.ok(qualifyProductService.qualifyPerUser(userId));
    }

    @PostMapping("/user/{userId}/product/{productId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<QualifyProduct> saveQualify(@PathVariable Long userId, @PathVariable Long productId, @RequestParam Long reservationId, @RequestBody QualifyProduct qualifyProduct){
        return ResponseEntity.ok(qualifyProductService.saveQualify(userId, productId, reservationId, qualifyProduct.getRating(), qualifyProduct.getComent()));
    }
    @PutMapping("/user/{userId}/product/{productId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<QualifyProduct> updateQualify(@PathVariable Long userId, @PathVariable Long productId, @RequestBody QualifyProduct qualifyProduct){
        return ResponseEntity.ok(qualifyProductService.updateQualify(userId, productId, qualifyProduct.getRating(), qualifyProduct.getComent()));
    }
    @DeleteMapping("/{qualifyProductId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteQualify(@PathVariable Long qualifyProductId){
        qualifyProductService.deleteQualify(qualifyProductId);
        return ResponseEntity.noContent().build();
    }
}