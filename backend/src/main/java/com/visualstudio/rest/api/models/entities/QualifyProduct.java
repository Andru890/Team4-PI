package com.visualstudio.rest.api.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "qualify_product")
@Builder(toBuilder = true)
public class QualifyProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @Column(name = "rating")
    @Min(1)
    @Max(5)
    private Integer rating;

    @Column(name = "coment")
    @Size(max = 300)
    private String coment;

    @Column(name = "date")
    private LocalDate date;

}