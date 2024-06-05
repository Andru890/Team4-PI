package com.visualstudio.rest.api.models.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class ProductDetailDTO {

    private Long id;
    private String characteristic;
}
