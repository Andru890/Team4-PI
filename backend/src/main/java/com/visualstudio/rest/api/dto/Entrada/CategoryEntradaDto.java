package com.visualstudio.rest.api.dto.Entrada;

import com.visualstudio.rest.api.models.entities.Product;
import jakarta.validation.constraints.*;
import java.util.List;

public class CategoryEntradaDto {

    @NotNull (message = "El nombre no puede ser nulo")
    @NotBlank (message = "El nombre no puede estar en blanco")
    @NotEmpty (message = "El nombre no puede estar vacio")
    private String name;

    @NotNull (message = "La lista no puede ser nula")
    @NotBlank (message = "La lista no puede ser blanca")
    @NotEmpty (message = "La lista no puede estar vacia")
    private List<Product> products;

    public CategoryEntradaDto() {
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
