package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.entities.Image;

import java.util.List;
import java.util.Optional;

public interface IImageService {
    List<Image> list();
    Optional<Image> getOne(Long id);
    void save(Image image);
    void delete(Long id);

}
