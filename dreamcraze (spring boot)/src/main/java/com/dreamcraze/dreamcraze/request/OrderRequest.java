package com.dreamcraze.dreamcraze.request;

import java.util.List;
import com.dreamcraze.dreamcraze.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    @NotEmpty(message = "Order list cannot be empty")
    private List<Product> order;

    @Min(value = 0, message = "Total price must be a positive value")
    private Integer totalpriceorder;

    @NotNull(message = "User ID is required")
    private Integer userId;
}