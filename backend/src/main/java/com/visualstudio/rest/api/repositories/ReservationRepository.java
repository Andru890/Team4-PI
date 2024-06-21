package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.Reservation;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query(value = "select r.* from reservations r inner join users u on r.user_id = u.id where u.email = ?1",
            nativeQuery = true)
    List<Reservation> getReservationByEmail(@Param("email") String email);
}
