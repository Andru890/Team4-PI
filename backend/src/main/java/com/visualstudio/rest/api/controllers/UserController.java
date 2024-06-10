package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.Security.CustomAuthenticationProvider;
import com.visualstudio.rest.api.dto.LoginDto;
import com.visualstudio.rest.api.dto.RegistroDto;
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/registry")
    public ResponseEntity<User> save(@Valid @RequestBody User user) {
        RegistroDto registroDto = new RegistroDto();
        registroDto.setName(user.getName());
        registroDto.setLastname(user.getLastname());
        registroDto.setEmail(user.getEmail());
        registroDto.setPhone(user.getPhone());
        registroDto.setCity(user.getCity());
        registroDto.setPassword(user.getPassword());

        User savedUser = userService.save(registroDto);

        if (savedUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<User>> serchAllUser() {
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> userDetail(@PathVariable Long userId) {
        return new ResponseEntity<>(userService.getOne(userId), HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> userDetail(@PathVariable String email) {
        User user = userService.confirmRegistration(email);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @PutMapping
    public ResponseEntity<User> userUpdate(@Valid @RequestBody User user) {
    try {
        User updatedUser = userService.update(user);
        return ResponseEntity.ok(updatedUser);
    }
    catch (UsernameNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    }

    @PutMapping("/role/{userId}")
    public ResponseEntity<User> changeRole(@PathVariable Long userId){
        return new ResponseEntity<>(userService.updateRole(userId), HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> userDelete(@PathVariable Long userId){
        userService.delete(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/authenticate")
    public String authenticate(@RequestBody LoginDto loginDto) {
        String token = userService.authenticate(loginDto);
        return ResponseEntity.ok(token).getBody();

    }


}
