package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.entities.Order;
import com.visualstudio.rest.api.models.entities.Reservation;
import com.visualstudio.rest.api.repositories.OrderRepository;
import com.visualstudio.rest.api.repositories.ReservationRepository;
import com.visualstudio.rest.api.services.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {

    private final OrderRepository orderRepository;
    private final ReservationRepository reservationRepository;
    @Override
    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order save(Order order) {
        Reservation reservation = reservationRepository.findById(order.getReservation().getId()).get();
        order.setReservation(reservation);
        return orderRepository.save(order);
    }

    @Override
    public Order update(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order findById(Long id) {
        return orderRepository.findById(id).get();
    }

    @Override
    public void delete(Long id) {
        orderRepository.deleteById(id);
    }
}