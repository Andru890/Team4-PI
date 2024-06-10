package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;

import java.util.List;

public interface IUserService {
    List<User> getAll();
    User save(User user);
    User update(User user, Long id);
    User getOne(Long id);
    User findByEmail(String email);
    void delete(Long id);
}
