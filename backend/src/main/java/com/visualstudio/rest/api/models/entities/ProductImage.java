package com.visualstudio.rest.api.models.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "product_images")
@Builder(toBuilder = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "img_name")
    private String name;

    @Column(name = "img_url", length = 1000)
    private String imageUrl;

    @Column(name = "img_id")
    private String imgId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
