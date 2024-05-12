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

    @Override
    public Order save(Order order) {
        return orderService.save(order);
    }

    @Override
    public Order update(Order order, Long id) {
        return orderService.update(order, id);
    }

    @Override
    public List<Order> getAll() {
        return orderService.getAll();
    }

    @Override
    public Order findById(Long id) {
        return orderService.findById(id);
    }

    @Override
    public void delete(Long id) {
        orderService.delete(id);
    }


}
