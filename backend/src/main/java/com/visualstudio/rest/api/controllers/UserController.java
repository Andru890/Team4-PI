package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.Security.CustomAuthenticationProvider;
import com.visualstudio.rest.api.models.dtos.security.LoginDto;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IRegistrationService;
import com.visualstudio.rest.api.services.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final IUserService userService;
    private final UserRepository userRepository;
    private final CustomAuthenticationProvider authenticationProvider;

    private final IRegistrationService registrationService;


    @Operation(summary = "Found list user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a user",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = User.class))}),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAll() {
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    @Operation(summary = "Login")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = User.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid credentials", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content)
    })
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
        try {
            String token = userService.authentication(loginDto);
            return ResponseEntity.ok(token);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("usuario o/y contraseña invalida");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }

    }
    @Operation(summary = "Found user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a user",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = User.class))}),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @GetMapping("/{userId}")
    public ResponseEntity<User> getOne(@PathVariable Long userId) {
        return new ResponseEntity<>(userService.getOne(userId), HttpStatus.OK);
    }

    @Operation(summary = "Found user by email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a user",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = User.class))}),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })


    @PutMapping
    public ResponseEntity<User> update(@Valid @RequestBody User user) {
        try {
            User updatedUser = userService.updateRole(user.getId());
            return ResponseEntity.ok(updatedUser);
        }
        catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @Operation(summary = "Change Role")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Delete a user",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = User.class))}),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @PutMapping("/role/{userId}")
    public ResponseEntity<User> updateRole(@PathVariable Long userId){
        return new ResponseEntity<>(userService.updateRole(userId), HttpStatus.OK);
    }

    @Operation(summary = "Delete user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Delete a user",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = User.class))}),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> delete(@PathVariable Long userId){
        userService.delete(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "Assign Admin Role")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Assign Admin Role",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = User.class))}),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })

    @PutMapping("/{userId}/assign-admin")
    public ResponseEntity<User> assignAdminRole(@PathVariable Long userId) {
        User assignedAdmin = userService.assignAdminRole(userId);
        return ResponseEntity.ok(assignedAdmin);
    }

    @PostMapping("/confirm")
    public ResponseEntity<Void> confirmRegistration(@RequestParam("token") String token) throws MessagingException {
        try {
            userService.confirmRegistration(token);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
    @PostMapping("/resend-confirmation")
    public ResponseEntity<?> resendConfirmationEmail(@RequestParam("email") String email) {
        try {
            userService.resendConfirmationEmail(email);
            return ResponseEntity.ok("Correo de confirmación reenviado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al reenviar el correo de confirmación");
        }
    }
}