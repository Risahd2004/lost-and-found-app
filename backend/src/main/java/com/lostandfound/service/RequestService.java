package com.lostandfound.service;

import com.lostandfound.dto.request.RequestRequest;
import com.lostandfound.dto.request.RequestResponse;
import com.lostandfound.enums.RequestStatus;
import java.util.List;

public interface RequestService {
    RequestResponse createRequest(RequestRequest requestRequest, Long userId);
    RequestResponse updateRequestStatus(Long id, RequestStatus status, String rejectionReason, Long processedBy);
    RequestResponse getRequest(Long id);
    List<RequestResponse> getAllRequests();
    List<RequestResponse> getRequestsByStatus(RequestStatus status);
    List<RequestResponse> getRequestsByUser(Long userId);
    List<RequestResponse> getRequestsByItem(Long itemId);
    void deleteRequest(Long id);
} 