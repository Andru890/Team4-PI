package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.entities.Role;

import java.util.List;

public interface IRoleService {
    List<Role> getAll();
    Role save(Role role);
    Role update(Role role);
    Role findById(Long id);
    void delete(Long id);
}
