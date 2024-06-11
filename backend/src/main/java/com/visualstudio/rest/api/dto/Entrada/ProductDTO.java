<<<<<<< HEAD
package com.visualstudio.rest.api.models.dtos;
=======
>>>>>>> 6c1f94879226d1696c5ca3e6878ac7de3f22046f
package com.visualstudio.rest.api.dto.Entrada;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.visualstudio.rest.api.models.entities.Category;
import com.visualstudio.rest.api.models.entities.FavoriteProducts;
import com.visualstudio.rest.api.models.entities.ProductDetail;
import com.visualstudio.rest.api.models.entities.Reservation;
import jakarta.persistence.*;
import lombok.*;
import com.visualstudio.rest.api.models.dtos.ProductDetailDTO;

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
