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
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
    public User update(User user, Long id) {
        User wantedUser = userRepository.findById(id).get();
        wantedUser.setName(user.getName());
        wantedUser.setLastname(user.getLastname());
        wantedUser.setEmail(user.getEmail());
        wantedUser.setPhone(user.getPhone());
        wantedUser.setCity(user.getCity());
        wantedUser.setPassword(passwordEncoder.encode(user.getPassword()));
        wantedUser.setImageUrl(user.getImageUrl());

        String email = wantedUser.getEmail();
        Role userRole = wantedUser.getRole();
        String roleName = (userRole != null) ? userRole.getName() : null;

        Map<String, Object> additionalClaims = new HashMap<>();
        additionalClaims.put("customCaim1", "value1");
        additionalClaims.put("customCaim2", "value2");

        String token = jwtUtilities.generateToken (
                email,
                Collections.singletonList(roleName),
                wantedUser.getName(),
                wantedUser.getLastname(),
                wantedUser.getPhone(),
                wantedUser.getCity(),
                wantedUser.getImageUrl(),
                additionalClaims);

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
        return null;
    }

    public FavoriteProducts addFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId).get();
        Product product = productRepository.findById(productId).get();

        FavoriteProducts newProduct = new FavoriteProducts();
        newProduct.setUser(user);
        newProduct.setProduct(product);
        return favoriteProductsRepository.save(newProduct);
    }

    /*public void removeFavorite(Long id) {
        FavoriteProducts product = favoriteProductsRepository.fin

    }*/

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
            Map<String, Object> additionalClaims = new HashMap<>();
            additionalClaims.put("customClaim1", "value1");
            additionalClaims.put("customClaim2", "value2");


            return jwtUtilities.generateToken(
                    email,
                    Collections.singletonList(roleName),
                    user.getName(),
                    user.getLastname(),
                    user.getPhone(),
                    user.getCity(),
                    user.getImageUrl(),
                    additionalClaims
            );
        }
        catch (BadCredentialsException e) {
            throw new BadCredentialsException("El usuario y/o la contraseña son incorrectos");
        }
        catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("El usuario no existe " + loginDto.getEmail());
        }
    }

    @Override
    public void confirmRegistration(String token) {
        if (jwtUtilities.validateToken(token)) {
            String email = jwtUtilities.extractUserName(token);
            User user = userRepository.findByEmail(email);
            if (user != null) {
                user.setConfirmed(true);
                userRepository.save(user);
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        user, null, Collections.singletonList(new SimpleGrantedAuthority(user.getUsername())));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                throw new IllegalArgumentException("Invalid token");
            }
        } else {
            throw new IllegalArgumentException("Invalid token");
        }
    }

    @Override
    public void resendConfirmationEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("El usuario no existe");
        }
        if (user.isConfirmed()) {
            throw new IllegalArgumentException("El usuario ya ha sido confirmado");
        }
        String token = jwtUtilities.generateToken(
                user.getEmail(),
                Collections.singletonList(user.getRole().getName()),
                user.getName(),
                user.getLastname(),
                user.getPhone(),
                user.getCity(),
                user.getImageUrl(),
                new HashMap<>());
        confirmRegistration(token);
    }

}