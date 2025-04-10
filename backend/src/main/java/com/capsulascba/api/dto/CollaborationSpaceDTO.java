package com.capsulascba.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for the CollaborationSpace entity.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CollaborationSpaceDTO {

    private Long id;
    private Long assignmentId;
    private String capsuleTitle;
    private String workGroupName;
    private boolean active;
    private List<CommentDTO> comments;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /**
     * DTO for Comment entity within CollaborationSpace.
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CommentDTO {
        private Long id;
        private Long authorId;
        private String authorName;
        private String content;
        private LocalDateTime createdAt;
        private boolean edited;
        private Long parentCommentId;
        private List<CommentDTO> replies;
    }

    /**
     * DTO for creating a new Comment in CollaborationSpace.
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateCommentDTO {
        private Long collaborationSpaceId;
        private String content;
        private Long parentCommentId;
    }

    /**
     * DTO for updating an existing Comment in CollaborationSpace.
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateCommentDTO {
        private Long id;
        private String content;
    }
}
