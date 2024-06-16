package com.visualstudio.rest.api.dto;

import com.visualstudio.rest.api.models.entities.Role;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;


@Data
@RequiredArgsConstructor
public class RegistroDto implements Serializable {

    private String name;
    private String lastname;
    private String phone;
    private String city;
    private String email;
    private String password;
    private Role role;


}

