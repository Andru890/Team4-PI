
package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.dto.LoginDto;
import com.visualstudio.rest.api.dto.RegistroDto;
import com.visualstudio.rest.api.models.entities.Role;
import com.visualstudio.rest.api.models.entities.User;

public interface IRegistrationService {

    User save(RegistroDto registroDto);

    User confirmRegistration(String email);
    String authenticate(LoginDto loginDto);

    Role getDefaultRole();
}
