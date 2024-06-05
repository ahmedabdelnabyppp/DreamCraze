package com.dreamcraze.dreamcraze.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthRequest {
    @NotBlank(message = "The Email is Null")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "The password is Null")
    private String password;
}
