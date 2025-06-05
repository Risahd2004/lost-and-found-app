package com.lostandfound.repository;

import com.lostandfound.entity.Report;
import com.lostandfound.enums.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByUserId(Long userId);
    List<Report> findByItemId(Long itemId);
    List<Report> findByReportType(ItemType reportType);
} 