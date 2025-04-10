package com.capsulascba.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entity class representing a version of content.
 * 
 * @author dbianco
 */
@Entity
@Table(name = "content_versions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContentVersion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_id", nullable = false)
    private Content content;

    @Column(name = "version_number", nullable = false)
    private Integer versionNumber;

    @Column(columnDefinition = "TEXT")
    private String content_data;

    @Column(columnDefinition = "TEXT")
    private String changeDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "is_current")
    private boolean current;

    @OneToMany(mappedBy = "version", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CapsuleAssignment> assignments = new ArrayList<>();

    @Column(name = "assignment_count")
    private Long assignmentCount = 0L;

    /**
     * Helper method to check if this version can be safely deleted
     * @return true if the version has no assignments and is not current
     */
    public boolean canBeDeleted() {
        return !current && (assignments == null || assignments.isEmpty());
    }

    /**
     * Helper method to check if this version can be assigned
     * @return true if the version's content is published and approved
     */
    public boolean canBeAssigned() {
        return content.isPublished() && content.isApproved();
    }

    /**
     * Helper method to get active assignments for this version
     * @return List of active assignments
     */
    public List<CapsuleAssignment> getActiveAssignments() {
        return assignments.stream()
                .filter(CapsuleAssignment::isActive)
                .collect(java.util.stream.Collectors.toList());
    }
}
