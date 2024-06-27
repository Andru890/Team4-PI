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
@Entity(name = "products_detail")
@Builder(toBuilder = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "characteristic", length = 1000)
    private String characteristic;

    @Lob
    @Column(name = "image_url")
    private String imageUrl;

}
