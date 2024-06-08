package com.visualstudio.rest.api.models.dtos;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private List<String> images;
    private Integer stock;
    private String categoryId;
}
