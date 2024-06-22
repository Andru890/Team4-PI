package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.entities.FavoriteProducts;

import java.util.List;

public interface IFavoriteProductsService {

    public List<FavoriteProducts> getAll();
    public FavoriteProducts getOne(Long id);
    public List<FavoriteProducts> getUserProducts(Long userId);
    public void saveFavorite(String userEmail, Long productId);
    void deleteFavorite(String userEmail, Long productId);
}
