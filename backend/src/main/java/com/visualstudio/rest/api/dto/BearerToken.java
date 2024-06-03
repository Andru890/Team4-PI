package com.visualstudio.rest.api.dto;


import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class BearerToken {

    private String accesToken;
    private String tokenType;
}
