package com.lostandfound.dto.item;

import com.lostandfound.enums.ItemStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ItemResponse {
    private Long id;
    private String name;
    private String description;
    private String location;
    private ItemStatus status;
    private Long reportedById;
    private String reportedByName;
    private Long claimedById;
    private String claimedByName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 