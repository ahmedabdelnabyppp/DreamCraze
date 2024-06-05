package com.discountapp.discountapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.math.BigDecimal;

import com.discountapp.discountapp.request.DiscountRequest;


@Entity
@Data
@Table(name = "discount")
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discount_id")
    private int discountId;

    @NotBlank(message = "Name is required")
    @Column(name = "name", nullable = false, unique = true, length = 100)
    private String name;

    @NotBlank(message = "Discount type is required")
    @Column(name = "discount_type", nullable = false, length = 20)
    private String discountType;

    @NotNull(message = "Discount value is required")
    @Column(name = "discount_value", nullable = false, precision = 10, scale = 2)
    private BigDecimal discountValue;

    @NotBlank(message = "End date is required")
    @Column(name = "end_date", nullable = false, length = 20)
    private String endDate;

    @PositiveOrZero(message = "Max usage must be positive or zero")
    @Column(name = "max_usage")
    private Integer maxUsage;

    @Column(name = "current_usage")
    private Integer currentUsage = 0;

    @NotNull(message = "Active flag is required")
    @Column(name = "active", nullable = false)
    private Boolean active = true;

    public static Discount discountRequestToDiscountEntity(DiscountRequest discountRequest) {
        Discount discount = new Discount();
        discount.setName(discountRequest.getName());
        discount.setDiscountType(discountRequest.getDiscountType());
        discount.setDiscountValue(discountRequest.getDiscountValue());
        discount.setEndDate(discountRequest.getEndDate());
        discount.setMaxUsage(discountRequest.getMaxUsage());
        return discount;
    }

}
