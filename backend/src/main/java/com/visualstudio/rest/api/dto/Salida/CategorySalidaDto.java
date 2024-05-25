package com.visualstudio.rest.api.dto.Salida;

import com.visualstudio.rest.api.models.entities.Product;

import java.util.List;

public class CategorySalidaDto {

    private Long id;
    private String name;

    private List<Product> products;

    public CategorySalidaDto () {}

    public CategorySalidaDto(Long id, String name, List<Product> products) {
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
