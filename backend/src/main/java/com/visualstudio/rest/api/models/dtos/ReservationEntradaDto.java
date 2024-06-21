package com.visualstudio.rest.api.models.dtos;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.models.entities.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;


import java.util.Date;
import java.util.List;

@JsonIgnoreProperties (ignoreUnknown = true)
public class ReservationEntradaDto {

    @FutureOrPresent(message = "La fecha no puede ser anterior al día de hoy")
    @NotNull(message = "Debe especificarse la fecha del pedido")
    @NotEmpty(message = "Debe especificarse la fecha del pedido")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateIn;

    @FutureOrPresent(message = "La fecha no puede ser anterior al día de hoy")
    @NotNull(message = "Debe especificarse la fecha de regreso del pedido")
    @NotEmpty(message = "Debe especificarse la fecha de regreso del pedido")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateOut;

    @NotNull (message = "El estado de la reserva no puede ser nulo")
    @NotBlank (message = "El estado de la reserva no puede estar en blanco")
    @NotEmpty (message = "El estado de la reserva no puede estar vacio")
    private String status;


    @NotBlank (message = "La lista de productos no puede estar en Blanco")
    @NotNull (message = "La lista de productos no puede ser nula")
    @NotEmpty (message = "La lista de productos no puede estar vacía")
    private List<Product> products;

    @NotNull (message = "El usuario no puede ser nulo")
    @NotBlank (message = "El usuario no puede estar en blanco")
    @NotEmpty (message = "El usuario no puede estar vacio")
    private User user;

    public ReservationEntradaDto() {
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
