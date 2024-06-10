/*
package com.visualstudio.rest.api.models.entities.Images;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.visualstudio.rest.api.models.entities.Category;
import com.visualstudio.rest.api.models.entities.ProductDetail;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name = "image_characteristic")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ImageCharacteristic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

    @Column(name = "image_id")
    private String imageId;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private ProductDetail productDetail;

    public ImageCharacteristic(String name, String url, String imageId) {
        this.name = name;
        this.url = url;
        this.imageId = imageId;
    }
}*/
