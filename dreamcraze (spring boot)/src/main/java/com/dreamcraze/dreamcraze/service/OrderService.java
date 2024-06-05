package com.dreamcraze.dreamcraze.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dreamcraze.dreamcraze.model.Order;
import com.dreamcraze.dreamcraze.model.OrderItem;
import com.dreamcraze.dreamcraze.model.Product;
import com.dreamcraze.dreamcraze.model.User;
import com.dreamcraze.dreamcraze.repository.OrderItemRepository;
import com.dreamcraze.dreamcraze.repository.OrderRepository;
import com.dreamcraze.dreamcraze.repository.ProductRepository;
import com.dreamcraze.dreamcraze.repository.UserRepository;
import com.dreamcraze.dreamcraze.request.OrderRequest;
import com.dreamcraze.dreamcraze.response.OrderResponse;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public Map<String, String> createOrder(OrderRequest orderRequest) {
        Map<String, String> response = new HashMap<>();
        Order order = Order.builder()
                .user(findUserToOrder(orderRequest.getUserId()))
                .totalAmount((float) orderRequest.getTotalpriceorder())
                .build();
        orderRepository.save(order);
        createOrderItems(orderRequest.getOrder(), order);
        response.put("status", "success");
        response.put("message", "order added successfully");

        return response;
    }

    private User findUserToOrder(int userId) {
        User user = userRepository.findById(userId);
        return user;
    }

    private void createOrderItems(List<Product> products, Order order) {
        for (Product product : products) {
            // Fetch the managed instance of Product from the database
            Product managedProduct = productRepository.findById(product.getId());

            // Create OrderItem with the managed Product
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(managedProduct);
            orderItem.setOrder(order);
            orderItem.setQuantity(product.getQuantity());
            orderItem.setUnitPrice((float) managedProduct.getPrice());
            orderItemRepository.save(orderItem);
        }
    }

    public List<OrderResponse> findProductsInOrderForUser(int userId) {
        List<Object[]> results = orderItemRepository.findProductsInOrderForUser(userId);
        List<OrderResponse> orderProducts = mapResultsToOrderResponses(results);
        return orderProducts;
    }

    private List<OrderResponse> mapResultsToOrderResponses(List<Object[]> results) {
        List<OrderResponse> orderProducts = new ArrayList<>();
        for (Object[] result : results) {
            OrderResponse orderProduct = mapResultToOrderResponse(result);
            orderProducts.add(orderProduct);
        }
        return orderProducts;
    }

    public Map<String, String> deleteOrderById(int orderId) {
        Map<String, String> response = new HashMap<>();

        orderRepository.deleteById(orderId);
        response.put("status", "success");
        response.put("message", "Order deleted successfully");

        return response;
    }

    private OrderResponse mapResultToOrderResponse(Object[] result) {
        OrderResponse orderProduct = new OrderResponse();
        orderProduct.setOrderId((Number) result[9]);
        orderProduct.setProductId((int) result[0]);
        orderProduct.setProductName((String) result[1]);
        orderProduct.setProductImage((String) result[2]);
        orderProduct.setProductBrand((String) result[3]);
        orderProduct.setProductPrice(((Number) result[4]));
        orderProduct.setProductRate(((Number) result[5]));
        orderProduct.setProductDescription((String) result[6]);
        orderProduct.setQuantity((Number) result[7]);
        orderProduct.setTotalPrice(((Number) result[8]));
        return orderProduct;

    }

}
