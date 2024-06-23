package com.visualstudio.rest.api.controllers;

import com.visualstudio.rest.api.models.dtos.ProductDTO;
import com.visualstudio.rest.api.models.dtos.ReservationDTO;
import com.visualstudio.rest.api.models.dtos.ReservationProductDTO;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.models.entities.Reservation;
import com.visualstudio.rest.api.services.IReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
public class ReservationController {

    private final IReservationService reservationService;

        @Operation(summary = "Found a reservation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a reservation",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))}),
            @ApiResponse(responseCode = "404", description = "Reservation not found", content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid reservation id", content = @Content)})
    @GetMapping("/detail/{reservationId}")
    public ResponseEntity<ReservationDTO> detailReservation(@PathVariable("reservationId") Long reservationId) {
        return new ResponseEntity<>(reservationService.findById(reservationId), HttpStatus.OK);
    }

    @Operation(summary = "Found list reservation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found a reservation",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))}),
            @ApiResponse(responseCode = "404", description = "Reservation not found", content = @Content)})
    @GetMapping
    public ResponseEntity<List<ReservationDTO>> searchAll() {
        return new ResponseEntity<>(reservationService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<ReservationDTO>> getReservationByEmail(@RequestParam("email") String email){
        return  new ResponseEntity<>(reservationService.getUserByReservation(email), HttpStatus.OK);
    }

    @Operation(summary = "Create a reservation")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create a reservation",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Product.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid product id", content = @Content)})
    @PostMapping("/product/{productId}/user/{userId}")
    public ResponseEntity<ReservationDTO> addReservation(@PathVariable("productId") Long productId, @PathVariable("userId") Long userId, @RequestBody ReservationProductDTO reservationProductDTO) {
        return new ResponseEntity<>(reservationService.save(productId, userId, reservationProductDTO), HttpStatus.OK);
    }
}
