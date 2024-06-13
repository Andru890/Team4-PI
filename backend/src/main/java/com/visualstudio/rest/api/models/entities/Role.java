package com.visualstudio.rest.api.models.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "roles")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Enumerated(EnumType.STRING)
    RoleName roleName;

   public Role(RoleName roleName) {
       this.roleName = roleName;
   }

   public String getRoleName() {
       return roleName.toString();
   }


}