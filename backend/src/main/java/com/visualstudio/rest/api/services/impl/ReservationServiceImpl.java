package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.exceptions.ResourceNotFoundException;
import com.visualstudio.rest.api.models.dtos.ProductDTO;
import com.visualstudio.rest.api.models.dtos.ReservationDTO;
import com.visualstudio.rest.api.models.dtos.ReservationProductDTO;
import com.visualstudio.rest.api.models.entities.Product;
import com.visualstudio.rest.api.models.entities.Reservation;
import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.ProductRepository;
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

    private final ProductRepository productRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    @Override
    public List<ReservationDTO> getAll() {
        List<Reservation> reservations = reservationRepository.findAll();
        List<ReservationDTO> reservationDTOS = new ArrayList<>();
        reservations.forEach(r -> {
            User user = userRepository.findById(r.getUser().getId())
                    .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Usuario con id %s", r.getUser().getId())));
            ReservationDTO reservationDTO = convertReservationToDTO(r);
            reservationDTO.setEmail(user.getEmail());
            reservationDTOS.add(reservationDTO);
        });
        return reservationDTOS;
    }

    

    @Override
    public ReservationDTO save(Long productId, Long userId, ReservationProductDTO reservationProductDTO) {

        Product productFound = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Producto con id %s", productId)));

        productFound.setReserved(true);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Usuario con id %s", userId)));

        Reservation reservation = Reservation
                .builder()
                .user(user)
                .products(List.of(productFound))
                .status("reserved")
                .dateIn(reservationProductDTO.getDateIn())
                .dateOut(reservationProductDTO.getDateOut())
                .build();

        return convertReservationToDTO(reservationRepository.save(reservation));
    }

    @Override
    public Reservation update(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public ReservationDTO findById(Long id) {

        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe Reservation con id %s", id)));

        User user = userRepository.findById(reservation.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No existe usuario con id %s", reservation.getUser().getId())));

        ReservationDTO reservationDTO = convertReservationToDTO(reservation);
        reservationDTO.setEmail(user.getEmail());

        return reservationDTO;
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