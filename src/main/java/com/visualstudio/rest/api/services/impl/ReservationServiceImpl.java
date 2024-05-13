package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.entities.Reservation;
import com.visualstudio.rest.api.services.IReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements IReservationService {


    @Override
    public List<Reservation> getAll() {
        return null;
    }

    @Override
    public Reservation save(Reservation reservation) {
        return null;
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
