package com.visualstudio.rest.api.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "products")
@Builder(toBuilder = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "image")
    private String image;

    @Column(name = "characteristic", length = 1000)
    private String characteristic;

    @Column(name = "stock")
    private Integer stock;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "FK_CATEGORY_ID"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "products"})
    private Category category;

    @ManyToMany(mappedBy = "products")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "products"})
    private List<Reservation> reservations;
}
