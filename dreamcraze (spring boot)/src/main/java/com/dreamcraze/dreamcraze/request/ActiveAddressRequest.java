package com.dreamcraze.dreamcraze.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ActiveAddressRequest {
    @NotNull(message = "User ID is required")
    @Min(value = 1, message = "User ID must be a positive number")
    private Integer userId;


    @NotNull(message = "Address ID is required")
    @Min(value = 1, message = "Address ID must be a positive number")
    private int addresId;
}
