package com.dreamcraze.dreamcraze.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dreamcraze.dreamcraze.request.OrderRequest;
import com.dreamcraze.dreamcraze.response.OrderResponse;
import com.dreamcraze.dreamcraze.service.OrderService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;
     
    @GetMapping("/productsInOrder")
    public List<OrderResponse> findProductsInOrderForUser(@RequestParam("userId") int userId) {
        return orderService.findProductsInOrderForUser(userId);
    }
    
    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createOrder(@Valid @RequestBody OrderRequest orderRequest) {
        Map<String, String> response = orderService.createOrder(orderRequest);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, String>> deleteOrderById(@RequestParam("orderId") int orderId) {
        Map<String, String> response = orderService.deleteOrderById(orderId);
        HttpStatus status = response.get("status").equals("success") ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return ResponseEntity.status(status).body(response);
    }

}
