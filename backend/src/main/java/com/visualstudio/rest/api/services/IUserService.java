package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.dtos.security.LoginDto;
import com.visualstudio.rest.api.models.entities.User;

import java.util.List;

public interface IUserService {
    List<User> getAll();

    User save(User user);

    User update(User user, String userEmail);

    User getOne(Long id);

    User findByEmail(String email);

    void delete(Long id);
    User updateRole(Long userId);
    User assignAdminRole(Long userId);

    String authentication(LoginDto loginDto);
}
