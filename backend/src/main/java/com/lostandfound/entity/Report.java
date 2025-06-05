package com.lostandfound.entity;

import com.lostandfound.enums.ItemType;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "report_type")
    private ItemType reportType;

    @Column(name = "report_date")
    private LocalDateTime reportDate;

    @PrePersist
    protected void onCreate() {
        reportDate = LocalDateTime.now();
    }
} 