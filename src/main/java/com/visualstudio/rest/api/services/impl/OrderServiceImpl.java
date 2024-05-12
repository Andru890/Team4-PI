package com.visualstudio.rest.api.services.impl;


import com.visualstudio.rest.api.services.IOrderService;
import com.visualstudio.rest.api.models.entities.Order;
import com.visualstudio.rest.api.repositories.OrderRepository;
import com.visualstudio.rest.api.models.entities.Reservation;
import com.visualstudio.rest.api.repositories.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService{

    public final IOrderService orderService;

    private final OrderRepository orderRepository;
    private final ReservationRepository reservationRepository;


    @Override
    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order save(Order order) {
        Reservation reservation = reservationRepository.findById(Order.getReservation()).get();
        order.setReservation(reservation);
        return orderRepository.save(reservation);
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
