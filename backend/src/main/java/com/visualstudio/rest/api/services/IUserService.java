package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.dto.LoginDto;
import com.visualstudio.rest.api.dto.RegistroDto;
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserService {
    List<User> getAll();
    User save(RegistroDto registroDto);
    User update(User user);

    User update(User user, Long id);

    User getOne(Long id);

    User findByEmail(String email);

    User confirmRegistration(String email);

    String authenticate(LoginDto loginDto);
    void delete(Long id);
    User updateRole(Long userId);
}
