package com.visualstudio.rest.api.models.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;

@JsonIgnoreProperties (ignoreUnknown = true)
public class RolEntradaDto {


    @NotNull (message = "El nombre no puede ser nulo")
    @NotBlank (message = "El nombre no puede estar en blanco")
    @NotEmpty (message = "El nombre no puede estar vacio")
    private String name;

    @NotNull (message = "La descripción no puede ser nula")
    @NotBlank (message = "La descripción no puede estar en blanco")
    @NotEmpty (message = "La descripción no puede estar vacia")
    private String description;

    @NotNull (message = "El estado no puede ser nulo")
    @NotBlank (message = "El estado no puede estar en blanco")

    private Boolean active;

    public RolEntradaDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
