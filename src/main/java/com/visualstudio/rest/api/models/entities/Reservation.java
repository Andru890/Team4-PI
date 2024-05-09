package com.visualstudio.rest.api.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "reservations")
@Builder(toBuilder = true)
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_in")
    private Date dateIn;

    @Column(name = "date_out")
    private Date dateOut;

    @Column(name = "status")
    private String status;

    @Column(name = "order_id")
    private Double orderId;

    @OneToMany(mappedBy = "reservation", fetch = FetchType.LAZY)
    //@JsonIgnoreProperties({"category"})
    private List<Product> products;

}
