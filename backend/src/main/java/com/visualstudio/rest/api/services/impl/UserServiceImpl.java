package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.dto.Entrada.UserEntradaDto;
import com.visualstudio.rest.api.dto.LoginDto;
import com.visualstudio.rest.api.dto.RegistroDto;
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.RoleRepository;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;

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


    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User update(User user, Long id) {
        User wantedUser = userRepository.findById(id).get();
        wantedUser.setName(user.getName());
        wantedUser.setLastname(user.getLastname());
        wantedUser.setEmail(user.getEmail());
        wantedUser.setPhone(user.getPhone());
        wantedUser.setCity(user.getCity());
        wantedUser.setPassword(passwordEncoder.encode(user.getPassword()));
        String email = wantedUser.getEmail();
        Role userRole = wantedUser.getRole();
        String roleName = (userRole != null) ? userRole.getName() : null;
        String token = jwtUtilities.generateToken(email, Collections.singletonList(roleName));

        return userRepository.save(wantedUser);
    }

    @Override
    public User getOne(Long id) {
        return userRepository.findById(id).get();
    }


    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateRole(Long userId) {
        return null;
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


}