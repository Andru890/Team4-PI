package com.visualstudio.rest.api.dto.Salida;

import com.visualstudio.rest.api.models.entities.Reservation;
import jakarta.persistence.*;

import java.util.Date;

public class OrderSalidaDto {

    private Long id;
    private Double totalAmount;
    private Date dateOrder;
    private String unitPrice;
    private Double discount;
    private String shippingMethod;
    private Double tax;
    private Reservation reservation;

    public OrderSalidaDto() {
    }

    public OrderSalidaDto(Long id, Double totalAmount, Date dateOrder, String unitPrice, Double discount, String shippingMethod, Double tax, Reservation reservation) {
        this.id = id;
        this.totalAmount = totalAmount;
        this.dateOrder = dateOrder;
        this.unitPrice = unitPrice;
        this.discount = discount;
        this.shippingMethod = shippingMethod;
        this.tax = tax;
        this.reservation = reservation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }
}
