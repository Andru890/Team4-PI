
package com.visualstudio.rest.api.dto.Entrada;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class CategoryDTO {

    private Long id;
    private String name;
    private String image;
    private String description;
}
