package com.visualstudio.rest.api.models.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class CategoryDTO {
    private Long id;
    private String name;
}
