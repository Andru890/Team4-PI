package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.RoleRepository;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements IRoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    @Override
    public Role save(Role role) {
        Role existingRole = roleRepository.findByName(role.getName());
        if (existingRole != null) {
            throw new IllegalArgumentException("El rol " + role.getName() + " ya existe en la base de datos");
        }
        return roleRepository.save(role);
    }

    @Override
    public Role update(Role role, Long id) {
        Role wantedRole = roleRepository.findById(id).get();
        wantedRole.setName(role.getName());
        return roleRepository.save(wantedRole);
    }

    @Override
    public User changeRole(Role role, Long id){
        User user = userRepository.findById(id).get();
        Role newRole = roleRepository.findByName(role.getName());
        if (newRole == null){
            throw new IllegalArgumentException("El rol " + role.getName() + " no existe en la base de datos.");
        }
        user.setRole(newRole);
        return userRepository.save(user);
    }

    @Override
    public Role getOne(Long id) {
        return roleRepository.findById(id).get();
    }

    @Override
    public void delete(Long id) {
        roleRepository.deleteById(id);
    }
}