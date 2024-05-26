package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.models.dtos.CategoryDTO;
import com.visualstudio.rest.api.models.entities.Category;
import com.visualstudio.rest.api.services.ICategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final ICategoryService categoryService;

    @Operation(summary = "Create a category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create a category",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Category.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid category id", content = @Content)})
    @PostMapping
    public ResponseEntity<CategoryDTO> addCategory(@RequestBody Category category) {
        return new ResponseEntity<>(categoryService.save(category), HttpStatus.CREATED);
    }

    @Operation(summary = "Found list category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a category",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Category.class))}),
            @ApiResponse(responseCode = "404", description = "Category not found", content = @Content)})
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> searchAll() {
        return new ResponseEntity<>(categoryService.getAll(), HttpStatus.OK);
    }


    @Operation(summary = "Found a category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a category",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Category.class))}),
            @ApiResponse(responseCode = "404", description = "Category not found", content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid category id", content = @Content)})
    @GetMapping("/detail/{categoryId}")
    public ResponseEntity<CategoryDTO> detailCategory(@PathVariable Long categoryId) {
        return new ResponseEntity<>(categoryService.findById(categoryId), HttpStatus.OK);
    }

    @Operation(summary = "Delete a category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Deleted a category",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Category.class))}),
            @ApiResponse(responseCode = "404", description = "Category not found", content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid category id", content = @Content)})
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> delete(@PathVariable Long categoryId) {
        categoryService.delete(categoryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}