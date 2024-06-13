package com.visualstudio.rest.api.dto.Entrada;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class ProductDetailDTO {

    private Long id;
    private String characteristic;
    private String imageUrl;
}
