package com.visualstudio.rest.api.models.dtos.security;


import lombok.Data;

@Data
public class BearerToken {

    private String accesToken;
    private String tokenType;

    public BearerToken(String accesToken, String tokenType) {
        this.accesToken = accesToken;
        this.tokenType = tokenType;
    }
}
