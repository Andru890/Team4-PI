package com.visualstudio.rest.api.dto.Modificación;

import com.visualstudio.rest.api.models.entities.Category;
import com.visualstudio.rest.api.models.entities.Reservation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class ProductModificationEntradaDto {

    @NotNull (message = "Debe proveerse el Id del producto que desea modificar")
    private Long id;
    @NotNull(message = "El nombre no puede ser nulo")
    @NotBlank(message = "El nombre no puede estar en blanco")
    @NotEmpty(message = "El nombre no puede estar vacio")
    private String name;

    @NotNull (message = "La descripción no puede ser nula")
    @NotBlank (message = "La descripción no puede estar en blanco")
    @NotEmpty (message = "La descripcion no puede estar vacia")
    private String description;

    @NotNull (message = "El precio no puede ser nulo")
    @NotBlank (message = "El precio no puede estar en blanco")
    @NotEmpty (message = "El precio no puede estar vacio")
    private Double price;

    @NotNull (message = "La imagen no puede ser nula")
    @NotBlank (message = "La imagen no puede estar en blanca")
    @NotEmpty (message = "La imagen no puede estar vacia")
    private String image;

    @NotNull (message = "Las características no pueden ser nula")
    @NotBlank (message = "Las características no pueden estar en blanco")
    @NotEmpty (message = "Las características no pueden estar nula")
    private String characteristic;

    @NotNull (message = "La categoría no puede ser nula")
    @NotBlank (message = "La categoría no puede estar en blanco")
    @NotEmpty (message = "La categoría no puede estar nula")
    private Category category;

    @NotNull (message = "La lista no puede ser nula")
    @NotBlank (message = "La lista no puede estar en blanco")
    @NotEmpty (message = "La lista no puede estar nula")
    private List<Reservation> reservations;


    public ProductModificationEntradaDto() {

    }

    public ProductModificationEntradaDto(Long id, String name, String description, Double price, String image, String characteristic, Category category, List<Reservation> reservations) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.characteristic = characteristic;
        this.category = category;
        this.reservations = reservations;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCharacteristic() {
        return characteristic;
    }

    public void setCharacteristic(String characteristic) {
        this.characteristic = characteristic;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
