package com.visualstudio.rest.api.models.dtos.security;


import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class BearerToken {

    private String accesToken;
    private String tokenType;
}
