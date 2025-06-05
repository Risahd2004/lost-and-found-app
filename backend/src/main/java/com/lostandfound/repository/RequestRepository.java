package com.lostandfound.repository;

import com.lostandfound.entity.Request;
import com.lostandfound.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByStatus(RequestStatus status);
    List<Request> findByRequesterId(Long userId);
    List<Request> findByItemId(Long itemId);
    List<Request> findByProcessedById(Long userId);
} 