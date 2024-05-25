package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.repositories.RoleRepository;
import com.visualstudio.rest.api.services.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements IRoleService {

    private final RoleRepository roleRepository;
    @Override
    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    @Override
    public Role save(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Role update(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Role findById(Long id) {
        return roleRepository.findById(id).get();
    }

    @Override
    public void delete(Long id) {
        roleRepository.deleteById(id);
    }
}
