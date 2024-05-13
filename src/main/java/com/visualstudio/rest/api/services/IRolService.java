package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.entities.Rol;

import java.util.List;

public interface IRolService {
    List<Rol> getAll();
    Rol save(Rol rol);
    Rol update(Rol rol);
    Rol findById(Long id);
    void delete(Long id);
}
