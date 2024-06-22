package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.models.entities.FavoriteProducts;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.services.IFavoriteProductsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
@RequiredArgsConstructor
public class FavoriteProductController {

    private final IFavoriteProductsService favoriteProductsService;

    @GetMapping("/list")
    public List<FavoriteProducts> allFavoritesList() {
     return favoriteProductsService.getAll();
    }

    @GetMapping("/{id}")
    public FavoriteProducts getFavoriteById(@PathVariable Long id) {
        return favoriteProductsService.getOne(id);
    }

    @GetMapping("/user/{id}")
    public List<FavoriteProducts> getUserFavorites(@PathVariable Long id) {
        return favoriteProductsService.getUserProducts(id);
    }

    @PostMapping("/user/{userEmail}/product/{productId}")
    public void addFavorite(@PathVariable String userEmail, @PathVariable Long productId) {
        favoriteProductsService.saveFavorite(userEmail, productId);
    }
    @DeleteMapping("/user/{userEmail}/product/{productId}")
    private void deleteFavorite(@PathVariable String userEmail, @PathVariable Long productId){
        favoriteProductsService.deleteFavorite(userEmail, productId);
    }

}
