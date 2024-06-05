package com.dreamcraze.dreamcraze.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryRequest {

    private int id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Image URL is required")
    private String image;
}
