
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
    public ResponseEntity<Role> save(@Valid @RequestBody Role role) {
        return new ResponseEntity<>(roleService.save(role), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Role>> getAll() {
        return new ResponseEntity<>(roleService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{roleId}")
    public ResponseEntity<Role> getOne(@PathVariable Long roleId) {
        return new ResponseEntity<>(roleService.getOne(roleId), HttpStatus.OK);
    }

    @PutMapping("/{roleId}")
    public ResponseEntity<Role> update(@Valid @RequestBody Role role, @PathVariable Long roleId){
        return new ResponseEntity<>(roleService.update(role, roleId), HttpStatus.OK);
    }

    @DeleteMapping("/{roleId}")
    public ResponseEntity<Void> delete(@PathVariable Long roleId){
        roleService.delete(roleId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
