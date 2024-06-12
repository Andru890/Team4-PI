package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.dtos.security.LoginDto;
import com.visualstudio.rest.api.models.dtos.security.RegistroDto;
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;

public interface IRegistrationService {

    User save(RegistroDto registroDto);

    User confirmRegistration(String email);
    String authenticate(LoginDto loginDto);

    Role getDefaultRole();
}
