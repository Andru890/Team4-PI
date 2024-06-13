package com.visualstudio.rest.api.dto;


import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class BearerToken {

    private String accesToken;
    private String tokenType;

    public BearerToken(String accesToken, String tokenType) {
        this.accesToken = accesToken;
        this.tokenType = tokenType;
    }
}
