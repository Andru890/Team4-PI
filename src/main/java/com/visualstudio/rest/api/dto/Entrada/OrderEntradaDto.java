package com.visualstudio.rest.api.dto.Entrada;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;


import java.util.Date;

@JsonIgnoreProperties (ignoreUnknown = true)
public class OrderEntradaDto {

    @NotBlank (message = "El total no puede ser nulo")
    @NotNull (message = "El total no puede ser vacío")
    @Size(min = 1, max = 10)
    private Double totalAmount;

    @FutureOrPresent(message = "La fecha no puede ser anterior al día de hoy")
    @NotNull(message = "Debe especificarse la fecha del pedido")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateOrder;

    @NotBlank (message = "El precio unitario no puede ser nulo")
    @NotNull (message = "El precio unitario puede ser vacío")
    @Size(min = 1, max = 10)
    private String unitPrice;

    @Size(min = 0, max = 10)
    private Double discount;

    @NotBlank (message = "El método de envío no puede ser nulo")
    @NotNull (message = "El método de envío no puede ser vacío")
    private String shippingMethod;

    @NotNull (message = "El impuesto no puede ser nulo")
    private Double tax;

    @NotBlank (message = "La reserva no puede ser nula")
    @NotNull (message = "La reserva no puede ser vacía")
    private ReservationEntradaDto reservation;

    public OrderEntradaDto() {
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Date getDateOrder() {
        return dateOrder;
    }

    public void setDateOrder(Date dateOrder) {
        this.dateOrder = dateOrder;
    }

    public String getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(String unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public String getShippingMethod() {
        return shippingMethod;
    }

    public void setShippingMethod(String shippingMethod) {
        this.shippingMethod = shippingMethod;
    }

    public Double getTax() {
        return tax;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public ReservationEntradaDto getReservation() {
        return reservation;
    }

    public void setReservation(ReservationEntradaDto reservation) {
        this.reservation = reservation;
    }
}
