package com.visualstudio.rest.api.models.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "names")
    private String name;

    @Column(name = "url")
    private String url;

    @Column(name = "image_id")
    private String imageId;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties
    private Product product;*/

    public Image(String name, String url, String imageId) {
        this.name = name;
        this.url = url;
        this.imageId = imageId;
    }
}
