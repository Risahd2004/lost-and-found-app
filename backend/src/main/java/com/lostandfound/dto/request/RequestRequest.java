package com.lostandfound.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequestRequest {
    @NotNull(message = "Item ID is required")
    private Long itemId;

    @NotBlank(message = "Reason is required")
    private String reason;
} 