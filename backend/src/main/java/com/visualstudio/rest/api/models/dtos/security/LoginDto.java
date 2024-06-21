package com.visualstudio.rest.api.models.dtos.security;
import lombok.*;

@Getter
@Setter
@Data
@RequiredArgsConstructor

public class LoginDto {

    private String email;
    private String password;

    public LoginDto(String mail, String password) {
    }
}
