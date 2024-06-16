package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{

    Role findByName(String name);
}