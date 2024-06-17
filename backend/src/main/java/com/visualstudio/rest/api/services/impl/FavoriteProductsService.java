package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.entities.FavoriteProducts;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.FavoriteProductsRepository;
import com.visualstudio.rest.api.repositories.ProductRepository;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IFavoriteProductsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteProductsService  implements IFavoriteProductsService {
    private final FavoriteProductsRepository favoriteProductsRepository;
    private final ProductRepository productsRepository;
    private final UserRepository userRepository;
    @Override
    public List<FavoriteProducts> getAll(){
        return favoriteProductsRepository.findAll();
    }
    @Override
    public FavoriteProducts getOne(Long id){
        return favoriteProductsRepository.findById(id).get();
    }
    @Override
    public List<FavoriteProducts> getUserProducts(Long userId) {
        User user = userRepository.findById(userId).get();
        List<FavoriteProducts> products = user.getFavoriteProducts();
        return products;
    }
    @Override
    public void saveFavorite(Long userId, Long productId){
        User user = userRepository.findById(userId).get();
        Product product = productsRepository.findById(productId).get();

        FavoriteProducts newFavorite = new FavoriteProducts();
        newFavorite.setUser(user);
        newFavorite.setProduct(product);
        favoriteProductsRepository.save(newFavorite);
    }

    public void deleteFavorite(Long id){
        favoriteProductsRepository.deleteById(id);
    }
}
