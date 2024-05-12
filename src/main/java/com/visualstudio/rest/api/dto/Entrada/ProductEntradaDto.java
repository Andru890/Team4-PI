package com.visualstudio.rest.api.dto.Entrada;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.visualstudio.rest.api.models.entities.Category;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.models.entities.Reservation;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;



import java.util.List;

@JsonIgnoreProperties (ignoreUnknown = true)
public class ProductEntradaDto {

    @NotNull (message = "El nombre no puede ser nulo")
    @NotBlank (message = "El nombre no puede estar en blanco")
    @NotEmpty (message = "El nombre no puede estar vacio")
    private String name;

    @NotNull (message = "La descripción no puede ser nula")
    @NotBlank (message = "La descripción no puede estar en blanco")
    @NotEmpty (message = "La descripcion no puede estar vacia")
    private String description;

    @NotNull (message = "El precio no puede ser nulo")
    @NotBlank (message = "El precio no puede estar en blanco")
    @NotEmpty (message = "El precio no puede estar vacio")
    @Min(value = 0, message = "El valor no puede ser cero")
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

    public ProductEntradaDto() {
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
