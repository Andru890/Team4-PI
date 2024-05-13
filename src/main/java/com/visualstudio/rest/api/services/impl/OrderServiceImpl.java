package com.visualstudio.rest.api.services.impl;

import com.visualstudio.rest.api.models.entities.Order;
import com.visualstudio.rest.api.services.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {
    @Override
    public List<Order> getAll() {
        return null;
    }

    @Override
    public Order save(Order order) {
        return null;
    }

    @Override
    public Order update(Order order, Long id) {
        return null;
    }

    @Override
    public Order findById(Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
