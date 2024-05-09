package com.visualstudio.rest.api.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "orders")
@Builder(toBuilder = true)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total_amount")
    private String totalAmount;

    @Column(name = "date_order")
    private Date dateOrder;

    @Column(name = "unit_price")
    private String unitPrice;

    @Column(name = "discount")
    private Double discount;

    @Column(name = "shipping_method")
    private String shippingMethod;

    @Column(name = "tax")
    private Double tax;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reservation_id", foreignKey = @ForeignKey(name = "FK_RESERVATION_ID"))
    private Reservation reservation;
}
