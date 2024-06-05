package com.dreamcraze.dreamcraze.request;

import com.dreamcraze.dreamcraze.config.AppConstants;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductPageRequest {
    @Min(value = 1, message = "Page number must be greater than or equal to 1")
    private Integer pageNumber = Integer.parseInt(AppConstants.PAGE_NUMBER);

    @Min(value = 1, message = "Page size must be greater than or equal to 1")
    private Integer pageSize = Integer.parseInt(AppConstants.PAGE_SIZE);

    @Pattern(regexp = "^(name|price|category)$", message = "SortBy must be one of: name, price, category")
    private String sortBy = AppConstants.SORT_PRODUCTS_BY;

    @Pattern(regexp = "^(asc|desc)$", message = "SortOrder must be either 'asc' or 'desc'")
    private String sortOrder = AppConstants.SORT_DIR;
}
