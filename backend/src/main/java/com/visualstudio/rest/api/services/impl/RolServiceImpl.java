package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.entities.Rol;
import com.visualstudio.rest.api.repositories.RolRepository;
import com.visualstudio.rest.api.services.IRolService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class RolServiceImpl implements IRolService {

    private final RolRepository rolRepository;
    @Override
    public List<Rol> getAll() {
        return rolRepository.findAll();
    }

    @Override
    public Rol save(Rol rol) {
        return rolRepository.save(rol);
    }

    @Override
    public Rol update(Rol rol) {
        return rolRepository.save(rol);
    }

    @Override
    public Rol findById(Long id) {
        return rolRepository.findById(id).get();
    }

    @Override
    public void delete(Long id) {
        rolRepository.deleteById(id);
    }
}
