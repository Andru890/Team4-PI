package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.dto.LoginDto;
import com.visualstudio.rest.api.dto.RegistroDto;
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import org.springframework.http.ResponseEntity;

public interface IRegistrationService {

    Role saveRole(Role role);


    User saveUser(User user);

    ResponseEntity<?> register(RegistroDto registroDto);

    String authenticate(LoginDto loginDto);


}
