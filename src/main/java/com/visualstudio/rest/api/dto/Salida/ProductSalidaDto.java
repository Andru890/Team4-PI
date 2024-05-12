package com.visualstudio.rest.api.dto.Salida;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.visualstudio.rest.api.models.entities.Category;
import com.visualstudio.rest.api.models.entities.Reservation;
import jakarta.persistence.*;

import java.util.List;

public class ProductSalidaDto {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private String image;
    private String characteristic;
    private Category category;
    private List<Reservation> reservations;

    public ProductSalidaDto() {
    }

    public ProductSalidaDto(Long id, String name, String description, Double price, String image, String characteristic, Category category, List<Reservation> reservations) {
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
