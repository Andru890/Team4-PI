package com.visualstudio.rest.api.models.dtos;
package com.visualstudio.rest.api.dto.Entrada;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.visualstudio.rest.api.models.entities.Category;
import com.visualstudio.rest.api.models.entities.FavoriteProducts;
import com.visualstudio.rest.api.models.entities.ProductDetail;
import com.visualstudio.rest.api.models.entities.Reservation;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductDTO {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private boolean isReserved;
    private Date dateIn;
    private Date dateOut;
    private List<ProductDetailDTO> characteristics;
    private List<String> images;
    private List<FavoriteProducts> favoriteProducts;
    private String categoryId;
}
