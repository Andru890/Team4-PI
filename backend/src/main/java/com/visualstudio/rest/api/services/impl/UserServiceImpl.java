package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.dtos.security.LoginDto;
import com.visualstudio.rest.api.models.entities.FavoriteProducts;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.FavoriteProductsRepository;
import com.visualstudio.rest.api.repositories.ProductRepository;
import com.visualstudio.rest.api.repositories.RoleRepository;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.visualstudio.rest.api.Security.JwtUtilities;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtilities jwtUtilities;
    private final AuthenticationManager authenticationManager;

    private final FavoriteProductsRepository favoriteProductsRepository;
    private final ProductRepository productRepository;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null){
            throw new IllegalArgumentException("El usuario con el correo " + user.getEmail() + " ya existe.");
        } else {
            Role customerRole = roleRepository.findByName("customer");
            user.setRole(customerRole);
            if (user.getRole() == null){
                user.setRole(getDefaultRole());
            }
        }
        return userRepository.save(user);
    }

    @Override
    public User update(User user, String userEmail) {
        User wantedUser = userRepository.findByEmail(userEmail);
        wantedUser.setName(user.getName());
        wantedUser.setLastname(user.getLastname());
        wantedUser.setEmail(user.getEmail());
        wantedUser.setPhone(user.getPhone());
        wantedUser.setCity(user.getCity());
        wantedUser.setImageUrl(user.getImageUrl());
        if (user.getPassword() != wantedUser.getPassword()){
            wantedUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(wantedUser);
    }

    @Override
    public User getOne(Long id) {
        return userRepository.findById(id).get();
    }
    @Override
    public User findByEmail(String email){
        User user = userRepository.findByEmail(email);
        if (user == null){
            throw new IllegalArgumentException("El usuario con mail " + email + " no está registrado.");
        }
        return user;
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateRole(Long userId) {
        User user = userRepository.findById(userId).get();
        Role newRole = roleRepository.findByName("admin");

        if (newRole == null){
            updateRole(userId);
        }

        if (user.getRole().getName() == "customer"){
            user.setRole(newRole);
        } else if (user.getRole().getName() == "admin") {
            user.setRole(roleRepository.findByName("customer"));
        }
        return userRepository.save(user);
    }

    public FavoriteProducts addFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId).get();
        Product product = productRepository.findById(productId).get();

        FavoriteProducts newProduct = new FavoriteProducts();
        newProduct.setUser(user);
        newProduct.setProduct(product);
        return favoriteProductsRepository.save(newProduct);
    }


    public Role getDefaultRole() {
        return new Role("customer");
    }

    @Override
    public User assignAdminRole(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("El usuario no existe"));
        if (user.getRole() != null) {
            throw new IllegalArgumentException("El usuario ya tiene un rol asignado");
        }
        Role adminRole = roleRepository.findByName("admin");
        if (adminRole == null)
            throw new IllegalArgumentException("El rol 'admin' no existe en la base de datos");
        user.setRole(adminRole);
        return userRepository.save(user);
    }

    @Override
    public String authentication(LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = (User) authentication.getPrincipal();
            String email = user.getEmail();
            Role userRole = user.getRole();
            String roleName = (userRole != null) ? userRole.getName() : null;
            return jwtUtilities.generateToken(email, Collections.singletonList(roleName));
        }
        catch (BadCredentialsException e) {
            throw new BadCredentialsException("El usuario y/o la contraseña son incorrectos");
        }
        catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("El usuario no existe " + loginDto.getEmail());
        }
    }

}
