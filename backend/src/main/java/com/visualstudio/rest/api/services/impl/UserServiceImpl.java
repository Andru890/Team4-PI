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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.visualstudio.rest.api.security.JwtUtilities;
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

    @Override
    public User save(RegistroDto registroDto) {
        User existingUser = userRepository.findByEmail(registroDto.getEmail());
        if (existingUser != null) {
            throw new IllegalArgumentException("El usuario con el correo " + registroDto.getEmail() + " ya existe.");
        }

        Role customerRole = roleRepository.findByName("customer");
        registroDto.setRole(customerRole != null ? customerRole : getDefaultRole());

        registroDto.setPassword(passwordEncoder.encode(registroDto.getPassword()));

        String token = jwtUtilities.generateToken(registroDto.getEmail(), Collections.singletonList(registroDto.getRole().getName()));

        User newUser = new User();
        newUser.setName(registroDto.getName());
        newUser.setLastname(registroDto.getLastname());
        newUser.setEmail(registroDto.getEmail());
        newUser.setPhone(registroDto.getPhone());
        newUser.setCity(registroDto.getCity());
        newUser.setPassword(registroDto.getPassword());
        newUser.setRole(registroDto.getRole());

        return userRepository.save(newUser);
    }

    @Override
    public User update(User user) {
        return null;
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
    public String authenticate(LoginDto loginDto) {
        Authentication authentication= authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String email = authentication.getName();
        Optional <User> userOptional = Optional.ofNullable(userRepository.findByEmail(email));
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("usuario no encontrado"));
        String roleName = user.getRole().getName();
        return jwtUtilities.generateToken(email, Collections.singletonList(roleName));
    }

    @Override
    public User getOne(Long id) {
        return userRepository.findById(id).get();
    }

    public User confirmRegistration(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            userRepository.save(user);}
        else {
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

    public Role getDefaultRole() {
        return new Role("customer");
    }

}