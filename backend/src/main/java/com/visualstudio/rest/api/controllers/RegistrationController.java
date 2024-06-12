package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.Security.CustomAuthenticationProvider;
import com.visualstudio.rest.api.models.dtos.security.LoginDto;
import com.visualstudio.rest.api.models.dtos.security.RegistroDto;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IRegistrationService;
import com.visualstudio.rest.api.services.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/registration")
public class RegistrationController {
    private final IUserService userService;
    private final UserRepository userRepository;
    private final CustomAuthenticationProvider authenticationProvider;
    private final IRegistrationService registrationService;



    @Operation(summary = "Registrar")
    @ApiResponses(value = {

            @ApiResponse(responseCode = "200", description = "Login successful",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = User.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid credentials", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content)
    })
    @PostMapping("/registry")
    public ResponseEntity<User> save(@Valid @RequestBody RegistroDto registroDto) {
        User savedUser = registrationService.save(registroDto);

        if (savedUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @Operation (summary = "Login")
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
