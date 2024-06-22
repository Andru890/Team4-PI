package com.visualstudio.rest.api.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
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

    @Lob
    @Column(name = "images", columnDefinition = "MEDIUMBLOB")
    private List<String> images;

    @Column(name = "stock")
    private Integer stock;

    @Column(name="reserved", nullable = false )
    private boolean isReserved;

    @Column(name = "date_in")
    private Date dateIn;

    @Column(name = "date_out")
    private Date dateOut;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "FK_CATEGORY_ID"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "products"})
    private Category category;

    @ManyToMany(mappedBy = "products")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "products"})
    private List<Reservation> reservations;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"product", "hibernateLazyInitializer"})
    private List<ProductDetail> characteristics;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<FavoriteProducts> favoriteProducts;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<QualifyProduct> qualifyProducts;
}