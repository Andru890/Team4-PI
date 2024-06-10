package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.services.IRoleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/role")
public class RoleController {
    private final IRoleService roleService;

    @PostMapping
    public ResponseEntity<Role> roleAdd(@Valid @RequestBody Role role) {
        return new ResponseEntity<>(roleService.save(role), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Role>> serchAllRoles() {
        return new ResponseEntity<>(roleService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{roleId}")
    public ResponseEntity<Role> roleDetail(@PathVariable Long roleId) {
        return new ResponseEntity<>(roleService.getOne(roleId), HttpStatus.OK);
    }

    @PutMapping("/{roleId}")
    public ResponseEntity<Role> roleUpdate(@Valid @RequestBody Role role, @PathVariable Long roleId){
        return new ResponseEntity<>(roleService.update(role, roleId), HttpStatus.OK);
    }

    @PutMapping("/change/{userId}")
    public ResponseEntity<User> changeRole(@Valid @RequestBody Role role, @PathVariable Long userId){
        return new ResponseEntity<>(roleService.changeRole(role, userId), HttpStatus.OK);
    }

    @DeleteMapping("/{roleId}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long roleId){
        roleService.delete(roleId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
