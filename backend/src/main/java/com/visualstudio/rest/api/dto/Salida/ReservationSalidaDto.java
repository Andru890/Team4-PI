package com.visualstudio.rest.api.dto.Salida;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.models.entities.User;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

public class ReservationSalidaDto {

    private Long id;
    private Date dateIn;
    private Date dateOut;
    private String status;
    private List<Product> products;
    private User user;

    public ReservationSalidaDto() {
    }

    public ReservationSalidaDto(Long id, Date dateIn, Date dateOut, String status, List<Product> products, User user) {
        this.id = id;
        this.dateIn = dateIn;
        this.dateOut = dateOut;
        this.status = status;
        this.products = products;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDateIn() {
        return dateIn;
    }

    public void setDateIn(Date dateIn) {
        this.dateIn = dateIn;
    }

    public Date getDateOut() {
        return dateOut;
    }

    public void setDateOut(Date dateOut) {
        this.dateOut = dateOut;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
