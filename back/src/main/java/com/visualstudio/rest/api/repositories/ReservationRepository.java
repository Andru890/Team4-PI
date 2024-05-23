package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
