package com.visualstudio.rest.api.controllers;

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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final IUserService userService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<User> userSave(@Valid @RequestBody User user) {
        RegistroDto registroDto = new RegistroDto();
        registroDto.setName(user.getName());
        registroDto.setLastname(user.getLastname());
        registroDto.setEmail(user.getEmail());
        registroDto.setPhone(user.getPhone());
        registroDto.setCity(user.getCity());
        registroDto.setPassword(user.getPassword());
        User userSave = userService.save(registroDto);

        if (userSave == null || userSave == userRepository.getReferenceById(user.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(userSave, HttpStatus.CREATED);
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
    public ResponseEntity<User> userUpdate(@Valid @RequestBody User user){
        User userUpdate = userService.update(user);
        return new ResponseEntity<>(userService.update(user), HttpStatus.OK);
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
        return userService.authenticate(loginDto);
    }
}