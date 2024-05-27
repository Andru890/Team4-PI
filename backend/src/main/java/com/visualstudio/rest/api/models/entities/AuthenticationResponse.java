package com.visualstudio.rest.api.models.entities;

import com.visualstudio.rest.api.dto.Entrada.UserEntradaDto;

public class AuthenticationResponse {

    private final String jwt;
    private UserEntradaDto userDto = new UserEntradaDto();

    public AuthenticationResponse(String jwt) {
        this.jwt = jwt;
        this.userDto = userDto;
    }

    public String getJwt() {
        return jwt;
    }

    public UserEntradaDto getUserDto() {
        return userDto;
    }
}
