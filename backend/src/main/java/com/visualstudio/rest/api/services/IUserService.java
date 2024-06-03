package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;

import java.util.List;

public interface IUserService {
    List<User> getAll();
    User save(User user);
    User update(User user);
    User getOne(Long id);
    void delete(Long id);
    User updateRole(Long userId);
}
