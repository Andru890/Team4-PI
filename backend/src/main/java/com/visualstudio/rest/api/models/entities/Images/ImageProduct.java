package com.visualstudio.rest.api.models.entities.Images;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.visualstudio.rest.api.models.entities.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "image_product")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ImageProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

    @Column(name = "image_id")
    private String imageId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public ImageProduct(String name, String url, String imageId) {
        this.name = name;
        this.url = url;
        this.imageId = imageId;
    }
}
