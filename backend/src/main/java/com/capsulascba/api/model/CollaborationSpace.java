package com.capsulascba.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entity class representing a collaboration space for a capsule assignment.
 */
@Entity
@Table(name = "collaboration_spaces")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CollaborationSpace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id", nullable = false)
    private CapsuleAssignment assignment;

    @Column(name = "active")
    private boolean active = true;

    @OneToMany(mappedBy = "space", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Helper method to add a comment to the space
     * @param author The user creating the comment
     * @param content The content of the comment
     * @return The created Comment
     */
    public Comment addComment(User author, String content) {
        Comment comment = Comment.builder()
                .author(author)
                .text(content)
                .space(this)
                .build();
        comments.add(comment);
        return comment;
    }

    /**
     * Helper method to check if collaboration is allowed
     * @return true if the space is active and the assignment allows collaboration
     */
    public boolean isCollaborationAllowed() {
        return active && assignment.isCollaborationAllowed();
    }
}
