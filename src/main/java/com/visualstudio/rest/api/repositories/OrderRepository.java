package com.visualstudio.rest.api.repositories;

import com.visualstudio.rest.api.models.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long>{
}
