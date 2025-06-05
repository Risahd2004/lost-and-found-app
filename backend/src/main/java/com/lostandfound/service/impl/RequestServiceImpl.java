package com.lostandfound.service.impl;

import com.lostandfound.dto.request.RequestRequest;
import com.lostandfound.dto.request.RequestResponse;
import com.lostandfound.entity.Item;
import com.lostandfound.entity.Request;
import com.lostandfound.entity.User;
import com.lostandfound.enums.RequestStatus;
import com.lostandfound.repository.ItemRepository;
import com.lostandfound.repository.RequestRepository;
import com.lostandfound.repository.UserRepository;
import com.lostandfound.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestServiceImpl implements RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Override
    @Transactional
    public RequestResponse createRequest(RequestRequest requestRequest, Long userId) {
        User requester = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Item item = itemRepository.findById(requestRequest.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (item.getStatus() != RequestStatus.FOUND) {
            throw new RuntimeException("Item is not available for claiming");
        }

        Request request = new Request();
        request.setItem(item);
        request.setRequester(requester);
        request.setReason(requestRequest.getReason());
        request.setStatus(RequestStatus.PENDING);

        Request savedRequest = requestRepository.save(request);
        return convertToResponse(savedRequest);
    }

    @Override
    @Transactional
    public RequestResponse updateRequestStatus(Long id, RequestStatus status, String rejectionReason, Long processedBy) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        User processor = userRepository.findById(processedBy)
                .orElseThrow(() -> new RuntimeException("User not found"));

        request.setStatus(status);
        request.setProcessedBy(processor);
        
        if (status == RequestStatus.REJECTED) {
            request.setRejectionReason(rejectionReason);
        } else if (status == RequestStatus.APPROVED) {
            request.getItem().setStatus(RequestStatus.CLAIMED);
            request.getItem().setClaimedBy(request.getRequester());
        }

        Request updatedRequest = requestRepository.save(request);
        return convertToResponse(updatedRequest);
    }

    @Override
    public RequestResponse getRequest(Long id) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        return convertToResponse(request);
    }

    @Override
    public List<RequestResponse> getAllRequests() {
        return requestRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<RequestResponse> getRequestsByStatus(RequestStatus status) {
        return requestRepository.findByStatus(status).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<RequestResponse> getRequestsByUser(Long userId) {
        return requestRepository.findByRequesterId(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<RequestResponse> getRequestsByItem(Long itemId) {
        return requestRepository.findByItemId(itemId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteRequest(Long id) {
        if (!requestRepository.existsById(id)) {
            throw new RuntimeException("Request not found");
        }
        requestRepository.deleteById(id);
    }

    private RequestResponse convertToResponse(Request request) {
        RequestResponse response = new RequestResponse();
        response.setId(request.getId());
        response.setItemId(request.getItem().getId());
        response.setItemName(request.getItem().getName());
        response.setRequesterId(request.getRequester().getId());
        response.setRequesterName(request.getRequester().getFullName());
        response.setReason(request.getReason());
        response.setStatus(request.getStatus());
        
        if (request.getProcessedBy() != null) {
            response.setProcessedById(request.getProcessedBy().getId());
            response.setProcessedByName(request.getProcessedBy().getFullName());
        }
        
        response.setRejectionReason(request.getRejectionReason());
        response.setCreatedAt(request.getCreatedAt());
        response.setUpdatedAt(request.getUpdatedAt());
        return response;
    }
} 