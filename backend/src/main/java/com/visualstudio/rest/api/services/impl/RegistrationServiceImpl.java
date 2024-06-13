package com.visualstudio.rest.api.services.impl;


import com.visualstudio.rest.api.Security.JwtUtilities;

import com.visualstudio.rest.api.dto.BearerToken;
import com.visualstudio.rest.api.models.entities.RoleName;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistrationServiceImpl implements IRegistrationService {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtUtilities jwtUtilities;
    private final AuthenticationManager authenticationManager;

    @Override
    public Role saveRole(Role role) {

        return roleRepository.save(role);
    }

    @Override
    public User saveUser(User user) {

        return userRepository.save(user);
    }
    @Override
    public ResponseEntity<?> register(RegistroDto registroDto) {
        Optional<User> existingUserOpt = Optional.ofNullable(userRepository.findByEmail(registroDto.getEmail()));
        if (existingUserOpt.isPresent()) {
            throw new IllegalArgumentException("El usuario con el correo " + registroDto.getEmail() + " ya existe.");
        }

        registroDto.setPassword(passwordEncoder.encode(registroDto.getPassword()));



        User newUser = new User();
        newUser.setName(registroDto.getName());
        newUser.setLastname(registroDto.getLastname());
        newUser.setEmail(registroDto.getEmail());
        newUser.setPhone(registroDto.getPhone());
        newUser.setCity(registroDto.getCity());
        newUser.setPassword(registroDto.getPassword());
        Role role = roleRepository.findByRoleName(RoleName.CUSTOMER);
        if (role == null) {
           role = new Role(RoleName.CUSTOMER);
           role.setRoleName(RoleName.CUSTOMER);
           roleRepository.save(role);
        }
        newUser.setRole(Collections.singletonList(role));

        userRepository.save(newUser);
        String token = jwtUtilities.generateToken(registroDto.getEmail(), Collections.singletonList(role.getRoleName()));

        return new ResponseEntity<>(new BearerToken(token, "Bearer"), HttpStatus.OK);
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
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("usuario no encontrado"));
        String roleName = user.getRole().stream().findFirst().map(Role::getRoleName).orElse(null);
        return jwtUtilities.generateToken(email, Collections.singletonList(roleName));
    }





}