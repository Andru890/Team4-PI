package com.visualstudio.rest.api.dto.Modificación;

import com.visualstudio.rest.api.models.entities.Product;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class CategoryModificationEntradaDto {

    @NotNull (message = "Debe proveerse el Id de la categoría que desea modificar")
    private Long id;
    @NotNull(message = "El nombre no puede ser nulo")
    @NotBlank(message = "El nombre no puede estar en blanco")
    @NotEmpty(message = "El nombre no puede estar vacio")
    private String name;

    @NotNull (message = "La lista no puede ser nula")
    @NotBlank (message = "La lista no puede ser blanca")
    @NotEmpty (message = "La lista no puede estar vacia")
    private List<Product> products;

    public CategoryModificationEntradaDto() {
    }

    public CategoryModificationEntradaDto(Long id, String name, List<Product> products) {
        this.id = id;
        this.name = name;
        this.products = products;
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

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
