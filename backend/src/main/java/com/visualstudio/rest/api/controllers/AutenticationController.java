/*
package com.visualstudio.rest.api.controllers;


import com.visualstudio.rest.api.models.entities.AuthenticationRequest;
import com.visualstudio.rest.api.models.entities.AuthenticationResponse;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.services.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import com.visualstudio.rest.api.security.JwtProvider;
import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = "*")
public class AutenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserServiceImpl userServiceImpl;

    private static final Logger logger = Logger.getLogger(AutenticationController.class.getName());

    @PostMapping ("/Login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            logger.warning("Credenciales incorrectas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");}

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = JwtProvider.generateToken(userDetails);
        logger.info("Iniciando sesión");
        return ResponseEntity.ok(new AuthenticationResponse(jwt));

    }

    @PostMapping("/Register")
    public ResponseEntity<?> saveUser(@RequestBody User userEntradaDto) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(userServiceImpl.save(userEntradaDto));
    }


}

*/
