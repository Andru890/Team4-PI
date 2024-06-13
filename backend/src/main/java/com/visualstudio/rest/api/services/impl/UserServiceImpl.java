package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.dto.LoginDto;
import com.visualstudio.rest.api.models.entities.*;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



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
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

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
        String email = wantedUser.getEmail();
        Role userRole = (Role) wantedUser.getRole();
        String roleName = userRole.getRoleName();
        String token = jwtUtilities.generateToken(email, Collections.singletonList(roleName));

        return userRepository.save(wantedUser); //se me ocurrió una idea de usar el update con solo el long id para cambiar el rol o quitar este rol por que es redunante lo toro
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
            Role userRole = (Role) user.getRole();
            String roleName = (userRole != null) ? userRole.getRoleName() : null;
            return jwtUtilities.generateToken(email, Collections.singletonList(roleName));
        }
        catch (BadCredentialsException e) {
            throw new BadCredentialsException("El usuario y/o la contraseña son incorrectos");
        }
        catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("El usuario no existe " + loginDto.getEmail());
        }
    }

    @Override
    public User changeUserRoleToAdmin(Long userId) {
        User userAdmin = userRepository.findById(userId).orElseThrow
                (() -> new IllegalArgumentException("El usuario con id " + userId + " no existe."));
        logger.info("El usuario con id " + userId + " existe.");

        Role adminRole = roleRepository.findByRoleName(RoleName.ADMIN);

        List<Role> userRole = userAdmin.getRole();
        if (userRole == null || userRole.isEmpty()) {
            userAdmin.setRole(Collections.singletonList(new Role(RoleName.CUSTOMER)));
            userRole = userAdmin.getRole();
        }

        boolean adminAlreadyAssigned = userRole.stream()
                .anyMatch(role -> role.getRoleName().equals(RoleName.ADMIN));

        if (!adminAlreadyAssigned) {

            userRole.add(adminRole);
            userAdmin.setRole(userRole);
        }

        userRepository.save(userAdmin);

        return userAdmin;
        }



    }



