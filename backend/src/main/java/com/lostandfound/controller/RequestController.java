package com.lostandfound.controller;

import com.lostandfound.dto.request.RequestRequest;
import com.lostandfound.dto.request.RequestResponse;
import com.lostandfound.enums.RequestStatus;
import com.lostandfound.service.RequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RequestController {

    @Autowired
    private RequestService requestService;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('STAFF') or hasRole('ADMIN')")
    public ResponseEntity<RequestResponse> createRequest(
            @Valid @RequestBody RequestRequest requestRequest,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        RequestResponse response = requestService.createRequest(requestRequest, userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('STAFF') or hasRole('ADMIN')")
    public ResponseEntity<RequestResponse> updateRequestStatus(
            @PathVariable Long id,
            @RequestParam RequestStatus status,
            @RequestParam(required = false) String rejectionReason,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        RequestResponse response = requestService.updateRequestStatus(id, status, rejectionReason, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestResponse> getRequest(@PathVariable Long id) {
        RequestResponse response = requestService.getRequest(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<RequestResponse>> getAllRequests() {
        List<RequestResponse> response = requestService.getAllRequests();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<RequestResponse>> getRequestsByStatus(@PathVariable RequestStatus status) {
        List<RequestResponse> response = requestService.getRequestsByStatus(status);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('STAFF') or hasRole('ADMIN')")
    public ResponseEntity<List<RequestResponse>> getRequestsByUser(Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        List<RequestResponse> response = requestService.getRequestsByUser(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<List<RequestResponse>> getRequestsByItem(@PathVariable Long itemId) {
        List<RequestResponse> response = requestService.getRequestsByItem(itemId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STAFF') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return ResponseEntity.ok().build();
    }

    private Long getUserIdFromAuthentication(Authentication authentication) {
        // This is a placeholder. You'll need to implement this based on your UserDetails implementation
        return 1L; // Replace with actual user ID from authentication
    }
} 