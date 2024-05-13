package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.entities.Rol;
import com.visualstudio.rest.api.services.IRolService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class RolServiceImpl implements IRolService {
    @Override
    public List<Rol> getAll() {
        return null;
    }

    @Override
    public Rol save(Rol rol) {
        return null;
    }

    @Override
    public Rol update(Rol rol, Long id) {
        return null;
    }

    @Override
    public Rol findById(Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
