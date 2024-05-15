package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.entities.Reservation;

import java.util.List;

public interface IReservationService {
    List<Reservation> getAll();
    Reservation save(Reservation reservation);
    Reservation update(Reservation reservation);
    Reservation findById(Long id);
    void delete(Long id);
}
