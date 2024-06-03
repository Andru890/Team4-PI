package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.dto.LoginDto;
import com.visualstudio.rest.api.dto.RegistroDto;
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;

import java.util.List;

public interface IUserService {
    List<User> getAll();
    User save(RegistroDto registroDto);
    User update(User user);
    User getOne(Long id);
    void delete(Long id);
    User updateRole(Long userId);
    User confirmRegistration(String email);
    String authenticate(LoginDto loginDto);
}
