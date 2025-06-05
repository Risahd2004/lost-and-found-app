package com.lostandfound.service;

import com.lostandfound.dto.item.ItemRequest;
import com.lostandfound.dto.item.ItemResponse;
import com.lostandfound.enums.ItemStatus;
import java.util.List;

public interface ItemService {
    ItemResponse createItem(ItemRequest itemRequest, Long userId);
    ItemResponse updateItem(Long id, ItemRequest itemRequest);
    ItemResponse getItem(Long id);
    List<ItemResponse> getAllItems();
    List<ItemResponse> getItemsByStatus(ItemStatus status);
    List<ItemResponse> getItemsByUser(Long userId);
    void deleteItem(Long id);
    ItemResponse claimItem(Long id, Long userId);
} 