package com.visualstudio.rest.api.models.dtos.security;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor

public class LoginDto {

    private String email;
    private String password;

    public LoginDto(String mail, String password) {
    }
}
