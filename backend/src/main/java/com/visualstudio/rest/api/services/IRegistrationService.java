
package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.dtos.security.LoginDto;
import com.visualstudio.rest.api.models.dtos.security.RegistroDto;
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;
import jakarta.mail.MessagingException;

public interface IRegistrationService {

    User save(RegistroDto registroDto) throws MessagingException;

    String authenticate(LoginDto loginDto);

    User confirmRegistration(String email);
    Role getDefaultRole();
}