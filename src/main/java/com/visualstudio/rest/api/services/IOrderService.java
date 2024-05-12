package com.visualstudio.rest.api.services;

import com.visualstudio.rest.api.models.entities.Order;

import java.util.List;
public interface IOrderService {

    List<Order> getAll();
    Order save(Order order);
    Order update(Order order, Long id);
    Order findById(Long id);
    void delete(Long id);
}
