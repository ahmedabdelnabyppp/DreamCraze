package com.dreamcraze.dreamcraze.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OtpRequest {
    @NotBlank(message = "the otp is required")
    private String Otp;
}
