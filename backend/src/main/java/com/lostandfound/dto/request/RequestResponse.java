package com.lostandfound.dto.request;

import com.lostandfound.enums.RequestStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RequestResponse {
    private Long id;
    private Long itemId;
    private String itemName;
    private Long requesterId;
    private String requesterName;
    private String reason;
    private RequestStatus status;
    private Long processedById;
    private String processedByName;
    private String rejectionReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 