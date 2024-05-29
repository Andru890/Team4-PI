package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.entities.Image;
import com.visualstudio.rest.api.repositories.ImageRepository;
import com.visualstudio.rest.api.services.IImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements IImageService {
    private final ImageRepository imageRepository;
    @Override
    public List<Image> list() {

        return imageRepository.findByOrderById();
    }

    @Override
    public Optional<Image> getOne(Long id) {
        return imageRepository.findById(id);
    }

    @Override
    public void save(Image image) {
        imageRepository.save(image);
    }



    @Override
    public void delete(Long id) {
        imageRepository.deleteById(id);
    }
}
