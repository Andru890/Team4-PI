package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.Images.ImageCharacteristic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageCharacteristicRepository extends JpaRepository<ImageCharacteristic, Long> {
}
