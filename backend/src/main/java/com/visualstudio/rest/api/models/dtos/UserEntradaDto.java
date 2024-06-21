package com.visualstudio.rest.api.models.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.visualstudio.rest.api.models.entities.FavoriteProducts;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties (ignoreUnknown = true)
public class UserEntradaDto {

    @NotNull (message = "El nombre no puede ser nulo")
    @NotBlank (message = "El nombre no puede estar vacío")
    @Size(min = 4, max = 20)
    private String name;

    private String lastname;

    @NotNull (message = "El número de celular no puede ser nulo")
    @NotBlank (message = "El número de celular no puede estar vacío")
    @Size(min = 11, max = 11)
    @Digits(integer = 8, fraction = 0, message = "El número debe tener como máximo 8 dígitos")
    private String phone;

    @NotNull (message = "La dirección no puede ser nulo")
    @NotBlank (message = "La dirección no puede estar vacío")
    @Size(min = 11, max = 30)
    private String city;

    @NotNull (message = "El correo no puede ser nulo")
    @NotBlank (message = "El correo no puede estar vacío")
    @Size(min = 4, max = 10)
    @Email(message = "El correo no es valido")

    private String email;

    @NotNull (message = "La contraseña no puede ser nulo")
    @NotBlank (message = "La contraseña no puede estar vacía")
    @Size(min = 8, max = 10)
    @Digits( integer = 8, fraction = 0, message = "La contraseña debe tener como mínimo 8 dígitos")

    private String password;

    private String imageUrl;

    private Boolean active;

    private List<FavoriteProducts> favoriteProducts;

    private List<RolEntradaDto> roles;

    private List<ReservationEntradaDto> reservations;


}