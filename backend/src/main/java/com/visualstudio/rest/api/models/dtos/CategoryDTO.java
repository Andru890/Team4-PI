
package com.visualstudio.rest.api.models.dtos;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class CategoryDTO {

    private Long id;
    private String name;
    private String imageUrl;
    private String description;
    private List<ProductDTO> products;
}
