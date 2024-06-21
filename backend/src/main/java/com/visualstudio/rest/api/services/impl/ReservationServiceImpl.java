package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.exceptions.ResourceNotFoundException;
import com.visualstudio.rest.api.models.dtos.ProductDTO;
import com.visualstudio.rest.api.models.dtos.ReservationDTO;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.models.entities.Reservation;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.ReservationRepository;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IReservationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements IReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    @Override
    public List<ReservationDTO> getAll() {
        List<Reservation> reservations = reservationRepository.findAll();
        List<ReservationDTO> reservationDTOS = new ArrayList<>();
        reservations.forEach(p -> reservationDTOS.add(convertReservationToDTO(p)));
        return reservationDTOS;
    }

    @Override
    public Reservation save(Reservation reservation) {
        User user = userRepository.findById(reservation.getUser().getId()).get();
        reservation.setUser(user);
        return reservationRepository.save(reservation);
    }

    @Override
    public Reservation update(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public ReservationDTO findById(Long id) {
        return convertReservationToDTO(reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Reservation con id %s", id))));
    }

    @Override
    public void delete(Long id) {
        reservationRepository.deleteById(id);
    }

    @Override
    public List<ReservationDTO> getUserByReservation(String email) {

        List<Reservation> reservations = reservationRepository.getReservationByEmail(email);
        List<ReservationDTO> reservationDTOS = new ArrayList<>();
        reservations.forEach(p -> reservationDTOS.add(convertReservationToDTO(p)));
        return reservationDTOS;
    }

    private ReservationDTO convertReservationToDTO(Reservation reservation){
        return  mapper.map(reservation, ReservationDTO.class);
    }
}