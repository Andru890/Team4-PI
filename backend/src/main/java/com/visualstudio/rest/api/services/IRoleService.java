package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;

import java.util.List;

public interface IRoleService {

    List<Role> getAll();

    Role save(Role role);

    Role update(Role role, Long id);

    User changeRole(Role role, Long id);

    Role getOne(Long id);

    void delete(Long id);
}
