package com.capsulascba.api.model;

import com.capsulascba.api.model.enums.AssignmentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * Entity class representing an assignment of a capsule version to a work group.
 */
@Entity
@Table(name = "capsule_assignments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CapsuleAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "work_group_id", nullable = false)
    private WorkGroup workGroup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id", nullable = false)
    private Content capsule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_version_id", nullable = false)
    private ContentVersion version;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_by", nullable = false)
    private User assignedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to", nullable = false)
    private User assignedTo;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssignmentStatus status;

    @Column(name = "collaboration_enabled")
    private boolean collaborationEnabled = true;

    @OneToOne(mappedBy = "assignment", cascade = CascadeType.ALL, orphanRemoval = true)
    private CollaborationSpace collaborationSpace;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    /**
     * Helper method to create and associate a collaboration space
     * @return The created CollaborationSpace
     */
    public CollaborationSpace createCollaborationSpace() {
        CollaborationSpace space = CollaborationSpace.builder()
                .assignment(this)
                .active(true)
                .build();
        this.collaborationSpace = space;
        return space;
    }

    /**
     * Helper method to check if the assignment is active
     * @return true if the assignment is currently active
     */
    public boolean isActive() {
        LocalDateTime now = LocalDateTime.now();
        return status == AssignmentStatus.IN_PROGRESS &&
               !now.isBefore(startDate) &&
               !now.isAfter(endDate);
    }

    /**
     * Helper method to check if collaboration is currently allowed
     * @return true if collaboration is enabled and the assignment is active
     */
    public boolean isCollaborationAllowed() {
        return collaborationEnabled && isActive();
    }
}
