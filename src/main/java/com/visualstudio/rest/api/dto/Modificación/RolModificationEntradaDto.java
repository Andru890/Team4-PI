package com.visualstudio.rest.api.dto.Modificación;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class RolModificationEntradaDto {

    @NotNull(message = "Debe proveerse el Id del rol que desea modificar")
    public Long id;

    @NotNull (message = "El nombre no puede ser nulo")
    @NotBlank(message = "El nombre no puede estar en blanco")
    @NotEmpty(message = "El nombre no puede estar vacio")
    private String name;

    @NotNull (message = "La descripción no puede ser nula")
    @NotBlank (message = "La descripción no puede estar en blanco")
    @NotEmpty (message = "La descripción no puede estar vacia")
    private String description;

    @NotNull (message = "El estado no puede ser nulo")
    @NotBlank (message = "El estado no puede estar en blanco")
    private Boolean active;

    public RolModificationEntradaDto() {
    }

    public RolModificationEntradaDto(Long id, String name, String description, Boolean active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
