package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolRepository extends JpaRepository<Role, Long>{
}
