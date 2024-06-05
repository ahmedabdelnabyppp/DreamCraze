package com.dreamcraze.dreamcraze.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
     private int id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Price is required")
    @PositiveOrZero(message = "Price must be positive or zero")
    private float price;

    @NotBlank(message = "Description is required")
    @Size(min = 5, max = 255, message = "Description must be between 5 and 255 characters")
    private String description;

    @NotBlank(message = "Image URL is required")
    private String image;

    @PositiveOrZero(message = "Rate must be positive or zero")
    private Float rate;

    @NotBlank(message = "Brand is required")
    private String brand;

    @PositiveOrZero(message = "Quantity must be positive or zero")
    private int quantity;

    @NotBlank(message = "Category is required")
    private String category;
}