package com.dreamcraze.dreamcraze.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private int productId;
    private String productName;
    private String productImage;
    private String productBrand;
    private Number productPrice;
    private Number productRate;
    private String productDescription; // Added description field
    private Number quantity;
    private Number totalPrice; // Added total price field
    private Number orderId;
}