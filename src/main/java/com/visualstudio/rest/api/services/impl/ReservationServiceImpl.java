package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.entities.User;
import com.visualstudio.rest.api.repositories.UserRepository;
import com.visualstudio.rest.api.services.IReservationService;
import com.visualstudio.rest.api.models.entities.Reservation;
import com.visualstudio.rest.api.repositories.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements IReservationService{

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;


    @Override
    public List<Reservation> getAll() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation save(Reservation reservation) {
        User user = userRepository.findById(reservation.getUser().getId()).get();
        reservation.setUser(user);
        return reservationRepository.save(reservation);
    }

    @Override
    public Reservation update(Reservation reservation, Long id) {
        return null;
    }

    @Override
    public Reservation findById(Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
