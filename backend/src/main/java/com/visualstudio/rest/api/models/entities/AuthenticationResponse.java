package com.visualstudio.rest.api.models.entities;

import com.visualstudio.rest.api.dto.Entrada.UserEntradaDto;

public class AuthenticationResponse {

    private final String jwt;
    private final UserEntradaDto userDto;

    public AuthenticationResponse(String jwt, UserEntradaDto userDto) {
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
