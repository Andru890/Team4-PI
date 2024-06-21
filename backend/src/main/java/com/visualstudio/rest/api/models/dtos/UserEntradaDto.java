package com.visualstudio.rest.api.models.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;


@JsonIgnoreProperties (ignoreUnknown = true)
public class UserEntradaDto {

    @NotNull (message = "El nombre no puede ser nulo")
    @NotBlank (message = "El nombre no puede estar vacío")
    @Size(min = 4, max = 20)
    private String name;

    @NotNull (message = "El número de celular no puede ser nulo")
    @NotBlank (message = "El número de celular no puede estar vacío")
    @Size(min = 11, max = 11)
    @Digits(integer = 8, fraction = 0, message = "El número debe tener como máximo 8 dígitos")
    private String mobile;

    @NotNull (message = "La dirección no puede ser nulo")
    @NotBlank (message = "La dirección no puede estar vacío")
    @Size(min = 11, max = 30)
    private String address;

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

    @NotNull (message = "La ciudad no puede ser nula")
    @NotBlank (message = "La ciudad no puede estar vacía")
    @Size(min = 4, max = 20)
    private String city;

    private String imageUrl;

    public UserEntradaDto() {}

    public UserEntradaDto(String name, String mobile, String address, String email, String password, String city, String imageUrl) {
        this.name = name;
        this.mobile = mobile;
        this.address = address;
        this.email = email;
        this.password = password;
        this.city = city;
        this.imageUrl = imageUrl;
    }

    public String getName() {
        return name;
    }
    public String getMobile() {
        return mobile;
    }
    public String getAddress() {
        return address;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
    public String getCity() {
        return city;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setCity(String city) {
        this.city = city;
    }
}