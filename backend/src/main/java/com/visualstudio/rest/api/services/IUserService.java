package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.dto.LoginDto;
import com.visualstudio.rest.api.models.entities.User;

import java.util.List;

public interface IUserService {
    List<User> getAll();



    User update(User user, Long id);

    User getOne(Long id);

    User findByEmail(String email);

    void delete(Long id);

    String authentication(LoginDto loginDto);

    User changeUserRoleToAdmin(Long userId);
}