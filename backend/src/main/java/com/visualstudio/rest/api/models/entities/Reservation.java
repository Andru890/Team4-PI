package com.visualstudio.rest.api.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "reservation_product",
            joinColumns = @JoinColumn(name = "reservation_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "reservations"})
    private List<Product> products;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_USER_ID"))
    private User user;
}
