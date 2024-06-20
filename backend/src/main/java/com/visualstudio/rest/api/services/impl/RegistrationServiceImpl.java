package com.visualstudio.rest.api.services.impl;


import com.visualstudio.rest.api.Security.JwtUtilities;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import com.visualstudio.rest.api.models.dtos.security.LoginDto;
import com.visualstudio.rest.api.models.dtos.security.RegistroDto;
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.RoleRepository;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IRegistrationService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor

public class RegistrationServiceImpl implements IRegistrationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtilities jwtUtilities;
    private final AuthenticationManager authenticationManager;
    private final EmailServiceImpl emailService;
    private String generateConfirmationEmailContent(User user, String token) {
        String baseUrl = "http://localhost:8000/";
        String confirmationUrl = baseUrl + "user/confirm?token=" + token;
        String message = "<html><body style='font-family: Helvetica, Arial, sans-serif; line-height: 1.5; text-align: center; font-size: 18px; color: #333;'>" +
                "<div style='max-width: 600px; margin: auto; padding: 15px; border: 5px solid #ddd; border-radius: 15px;'>" +
                "<h1 style='color: #333; font-size: 25px; text-align: center'>Bienvenido a Visual Studio</h1>" +
                "<h2>" + user.getName() + "</h2>" +
                "<h2 style= 'color: #345382'>Tu correo electrónico de acceso es: " + user.getEmail() + "</h2>" +
                "<p>Gracias por registrarte en Visual Studio. Por favor, confirma tu registro haciendo clic en el siguiente enlace:</p>" +
                "<p><a href='" + confirmationUrl + "' style='display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 8px;'>Confirmar registro</a></p>" +
                "<p style= 'color: #345382'>Saludos desde el equipo de Visual Studio.</p>" +
                "<p>Si no has solicitado este registro, puedes ignorar este correo.</p>" +
                "</div></body></html>";
        return message;
    }
    @Override
    public User save(RegistroDto registroDto) throws MessagingException {
        User existingUser = userRepository.findByEmail(registroDto.getEmail());
        if (existingUser != null) {
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
        newUser.setRole(getDefaultRole());
        newUser.setImageUrl(registroDto.getImageUrl());

        User savedUser = userRepository.save(newUser);

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

        String toUser = savedUser.getEmail();
        String subject = "Confirmar correo de Visual Studio";
        String message = generateConfirmationEmailContent(savedUser, token);


        emailService.sendEmail(toUser, subject, message);

        return savedUser;

    }

    @Override
    public String authenticate(LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = (User) authentication.getPrincipal();
            if (!user.isConfirmed()) {
                throw new IllegalArgumentException("Usuario no confirmado.");
            }

            String email = user.getEmail();
            Role userRole = user.getRole();
            String roleName = (userRole != null) ? userRole.getName() : null;

            Map<String, Object> additionalClaims = new HashMap<>();
            additionalClaims.put("customClaim1", "value1");
            additionalClaims.put("customClaim2", "value2");

            String token = jwtUtilities.generateToken(
                    email,
                    Collections.singletonList(roleName),
                    user.getName(),
                    user.getLastname(),
                    user.getPhone(),
                    user.getCity(),
                    user.getImageUrl(),
                    additionalClaims
            );

            return token;
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("El usuario y/o la contraseña son incorrectos");
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("El usuario no existe " + loginDto.getEmail());
        }
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

    @Override
    public User confirmRegistration(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setConfirmed(true);
            userRepository.save(user);

        }
        return user;
    }




    }


