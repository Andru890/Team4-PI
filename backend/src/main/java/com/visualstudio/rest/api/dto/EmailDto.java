package com.visualstudio.rest.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmailDto {

    @NotBlank(message = "El correo electronico es requerido")
    @Email(message = "El correo electronico debe ser valido")
    private String toUser;

    @NotBlank(message = "El asunto es requerido")
    private String subject;

    @NotBlank(message = "El mensaje es requerido")
    private String message;

}
