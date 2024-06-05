package com.dreamcraze.dreamcraze.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressRequest {

    private int userId;

    @NotBlank(message = "Address line is required")
    @NotNull(message = "Address line is required")
    @Size(max = 500, message = "Address line must be less than 100 characters")
    private String street;

    @NotBlank(message = "City is required")
    @Size(max = 50, message = "City must be less than 50 characters")
    private String city;

    @NotBlank(message = "Country is required")
    @Size(max = 50, message = "Country must be less than 50 characters")
    private String country;

    @NotBlank(message = "landmark is required")
    @Size(max = 50, message = "landmark must be less than 50 characters")
    private String landmark ;

    @NotBlank(message = "delivery Instruction is required")
    @Size(max = 50, message = "delivery Instruction must be less than 50 characters")
    private String deliveryInstruction;



}
