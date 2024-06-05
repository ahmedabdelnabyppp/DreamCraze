package com.discountapp.discountapp.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class DiscountRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Discount type is required")
    private String discountType;

    @NotNull(message = "Discount value is required")
    @DecimalMin(value = "0.00", message = "Discount value must be positive")
    private BigDecimal discountValue;

    @NotBlank(message = "End date is required")
    @FutureOrPresent(message = "End date must be a future or present date")
    private String endDate;

    @PositiveOrZero(message = "Max usage must be positive or zero")
    private Integer maxUsage;
}