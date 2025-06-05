package com.lostandfound.repository;

import com.lostandfound.entity.Item;
import com.lostandfound.enums.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByStatus(ItemStatus status);
    List<Item> findByReportedById(Long userId);
    List<Item> findByClaimedById(Long userId);
} 