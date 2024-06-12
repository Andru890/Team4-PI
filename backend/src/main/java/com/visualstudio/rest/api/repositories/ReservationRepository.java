package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.Reservation;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
