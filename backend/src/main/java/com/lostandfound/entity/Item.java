package com.lostandfound.entity;

import com.lostandfound.enums.ItemStatus;
import com.lostandfound.enums.ItemType;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "category")
    private String category;

    @Column(name = "location")
    private String location;

    @Column(name = "date_lost")
    private LocalDate dateLost;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ItemStatus status;

    @Column(name = "image_url")
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ItemType type;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
} 