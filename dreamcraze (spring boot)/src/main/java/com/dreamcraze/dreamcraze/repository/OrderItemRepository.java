package com.dreamcraze.dreamcraze.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dreamcraze.dreamcraze.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    @Query(value = "SELECT p.ID AS product_id, p.Name AS product_name, p.Image AS product_image, p.brand AS product_brand, p.Price AS product_price, p.Rate AS product_rate, p.Description AS product_description, oi.quantity, oi.quantity * oi.unit_price AS total_price, oi.order_id " +
            "FROM Products p " +
            "JOIN Order_Items oi ON p.ID = oi.product_id " +
            "JOIN Orders o ON oi.order_id = o.order_id " +
            "WHERE o.user_id = :userId", nativeQuery = true)
    List<Object[]> findProductsInOrderForUser(@Param("userId") int userId);
}
