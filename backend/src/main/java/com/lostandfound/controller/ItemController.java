package com.lostandfound.controller;

import com.lostandfound.dto.item.ItemRequest;
import com.lostandfound.dto.item.ItemResponse;
import com.lostandfound.enums.ItemStatus;
import com.lostandfound.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('STAFF') or hasRole('ADMIN')")
    public ResponseEntity<ItemResponse> createItem(
            @Valid @RequestBody ItemRequest itemRequest,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        ItemResponse response = itemService.createItem(itemRequest, userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STAFF') or hasRole('ADMIN')")
    public ResponseEntity<ItemResponse> updateItem(
            @PathVariable Long id,
            @Valid @RequestBody ItemRequest itemRequest) {
        ItemResponse response = itemService.updateItem(id, itemRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponse> getItem(@PathVariable Long id) {
        ItemResponse response = itemService.getItem(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ItemResponse>> getAllItems() {
        List<ItemResponse> response = itemService.getAllItems();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ItemResponse>> getItemsByStatus(@PathVariable ItemStatus status) {
        List<ItemResponse> response = itemService.getItemsByStatus(status);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('STAFF') or hasRole('ADMIN')")
    public ResponseEntity<List<ItemResponse>> getItemsByUser(Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        List<ItemResponse> response = itemService.getItemsByUser(userId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STAFF') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/claim")
    @PreAuthorize("hasRole('USER') or hasRole('STAFF') or hasRole('ADMIN')")
    public ResponseEntity<ItemResponse> claimItem(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        ItemResponse response = itemService.claimItem(id, userId);
        return ResponseEntity.ok(response);
    }

    private Long getUserIdFromAuthentication(Authentication authentication) {
        // This is a placeholder. You'll need to implement this based on your UserDetails implementation
        return 1L; // Replace with actual user ID from authentication
    }
} 