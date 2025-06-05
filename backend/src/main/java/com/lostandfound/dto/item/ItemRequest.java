package com.lostandfound.dto.item;

import com.lostandfound.enums.ItemStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ItemRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Location is required")
    private String location;

    private ItemStatus status;
} 