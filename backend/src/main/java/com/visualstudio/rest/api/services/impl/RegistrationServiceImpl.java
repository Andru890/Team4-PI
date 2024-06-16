package com.visualstudio.rest.api.services.impl;


import com.visualstudio.rest.api.Security.JwtUtilities;
import com.visualstudio.rest.api.dto.BearerToken;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.visualstudio.rest.api.dto.LoginDto;
import com.visualstudio.rest.api.dto.RegistroDto;
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.RoleRepository;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IRegistrationService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor

public class RegistrationServiceImpl implements IRegistrationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtilities jwtUtilities;
    private final AuthenticationManager authenticationManager;



    @Override
    public User save(RegistroDto registroDto) {
        User existingUser = userRepository.findByEmail(registroDto.getEmail());
        if (existingUser != null) {
            throw new IllegalArgumentException("El usuario con el correo " + registroDto.getEmail() + " ya existe.");
        }

        registroDto.setPassword(passwordEncoder.encode(registroDto.getPassword()));

        Map<String, Object> additionalClaims = new HashMap<>();
        additionalClaims.put("customClaim1", "value1");
        additionalClaims.put("customClaim2", "value2");

        String token = jwtUtilities.generateToken(
                registroDto.getEmail(),
                Collections.singletonList(registroDto.getName()),  // roles
                registroDto.getName(),
                registroDto.getLastname(),
                registroDto.getPhone(),
                registroDto.getCity(),
                registroDto.getImageUrl(),
                additionalClaims
        );

        User newUser = new User();
        newUser.setName(registroDto.getName());
        newUser.setLastname(registroDto.getLastname());
        newUser.setEmail(registroDto.getEmail());
        newUser.setPhone(registroDto.getPhone());
        newUser.setCity(registroDto.getCity());
        newUser.setPassword(registroDto.getPassword());
        newUser.setRole(getDefaultRole());

        return userRepository.save(newUser);


    }

    @Override
    public String authenticate(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String email = authentication.getName();
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmail(email));
        User user = userOptional.get();
        String roleName = user.getRole().getName();

        Map<String, Object> additionalClaims = new HashMap<>();
        additionalClaims.put("customClaim1", "value1");
        additionalClaims.put("customClaim2", "value2");


        String token = jwtUtilities.generateToken(
                email,
                Collections.singletonList(roleName),  // roles
                user.getName(),
                user.getLastname(),
                user.getPhone(),
                user.getCity(),
                user.getImageUrl(),
                additionalClaims
        );
        return token;
    }

    public User confirmRegistration(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("El usuario con mail " + email + " no está registrado.");
        }
        return user;
    }

    public Role getDefaultRole() {
        String defaultRoleName = "customer";
        Role defaultRole = roleRepository.findByName(defaultRoleName);
        if (defaultRole == null) {
            defaultRole = new Role(defaultRoleName);
            roleRepository.save(defaultRole);
        }
        return defaultRole;
    }

}