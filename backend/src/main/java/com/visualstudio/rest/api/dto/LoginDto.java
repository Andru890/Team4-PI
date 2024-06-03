package com.visualstudio.rest.api.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class LoginDto {

    private String email;
    private String password;
}
