package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.models.entities.User;
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

    @PostMapping
    public ResponseEntity<User> userAdd(@Valid @RequestBody User user) {
        return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<User>> serchAllUser() {
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> userDetail(@PathVariable Long userId) {
        return new ResponseEntity<>(userService.findById(userId), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<User> userUpdate(@Valid @RequestBody User user){
        return new ResponseEntity<>(userService.update(user), HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> userDelete(@PathVariable Long userId){
        userService.delete(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
