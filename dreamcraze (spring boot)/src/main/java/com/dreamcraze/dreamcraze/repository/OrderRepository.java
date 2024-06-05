package com.dreamcraze.dreamcraze.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.dreamcraze.dreamcraze.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}
