package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.Security.CustomAuthenticationProvider;
import com.visualstudio.rest.api.dto.LoginDto;
import com.visualstudio.rest.api.dto.RegistroDto;
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IEmailService;
import com.visualstudio.rest.api.services.IRegistrationService;
import com.visualstudio.rest.api.services.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/registration")
public class RegistrationController {
    @Autowired
    private final IUserService userService;

    private final UserRepository userRepository;

    private final CustomAuthenticationProvider authenticationProvider;

    private final IRegistrationService registrationService;

    @Autowired
    private IEmailService emailService;

    @PostMapping("/role")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        Role savedRole = registrationService.saveRole(role);
        return new ResponseEntity<>(savedRole, HttpStatus.CREATED);
    }

    @PostMapping("/user")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        User savedUser = registrationService.saveUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    @Operation(summary = "Registrar")
    @ApiResponses(value = {

            @ApiResponse(responseCode = "200", description = "Login successful",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = User.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid credentials", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content)
    })
    @PostMapping("/registry")
    public ResponseEntity<?> register(@Valid @RequestBody RegistroDto registroDto) {
        ResponseEntity<?> savedUser = registrationService.register(registroDto);

        if (savedUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String subject = "Bienvenido a Visual Studio";

        emailService.sendEmail((String) savedUser.getBody(), subject, "Bienvenido a Visual Studio");
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @Operation (summary = "authenticate")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = User.class))}),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })

    @PostMapping("/authenticate")
    public String authenticate(@RequestBody LoginDto loginDto) {
        String token = registrationService.authenticate(loginDto);
        return ResponseEntity.ok(token).getBody();

    }

    @GetMapping("/lastEmail")
    public ResponseEntity<Map<String, String>> getLastEmail() {
        String lastToUser = emailService.getLastToUser();
        String lastSubject = emailService.getLastSubject();
        String lastMessage = emailService.getLastMessage();

        Map<String, String> response = new HashMap<>();
        response.put("toUser", lastToUser);
        response.put("subject", lastSubject);
        response.put("message", lastMessage);

        return ResponseEntity.ok(response);

    }

    @Operation(summary = "Logout")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Logout",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = User.class))}),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        SecurityContextHolder.clearContext();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}