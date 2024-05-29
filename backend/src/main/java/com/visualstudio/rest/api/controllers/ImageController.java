package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.models.entities.Image;
import com.visualstudio.rest.api.services.IImageService;
import com.visualstudio.rest.api.services.impl.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/cloudinary")
@RequiredArgsConstructor
public class ImageController {
    private final CloudinaryService cloudinaryService;
    private final IImageService imageService;

    @GetMapping
    public ResponseEntity<List<Image>> list(){
        List<Image> list = imageService.list();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> upload(@RequestParam MultipartFile multipartFile) throws IOException{
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Map result = cloudinaryService.upload(multipartFile);
        Image image = new Image(
                (String) result.get("original_filename"),
                (String) result.get("url"),
                (String) result.get("public_id")
        );
        imageService.save(image);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws IOException {
        Optional<Image> imageO = imageService.getOne(id);
        if (imageO.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Image image = imageO.get();
        String cloudinaryImageId = image.getImageId();
        cloudinaryService.delete(cloudinaryImageId);
        imageService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
