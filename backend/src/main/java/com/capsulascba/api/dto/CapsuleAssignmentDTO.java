package com.capsulascba.api.dto;

import com.capsulascba.api.model.enums.AssignmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for the CapsuleAssignment entity.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CapsuleAssignmentDTO {

    private Long id;
    private Long workGroupId;
    private String workGroupName;
    private Long capsuleId;
    private String capsuleTitle;
    private Long versionId;
    private Integer versionNumber;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private AssignmentStatus status;
    private boolean collaborationEnabled;
    private Long collaborationSpaceId;
    private LocalDateTime createdAt;

    /**
     * DTO for creating a new CapsuleAssignment.
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateCapsuleAssignmentDTO {
        private Long workGroupId;
        private Long capsuleId;
        private Long versionId;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private boolean collaborationEnabled;
    }

    /**
     * DTO for updating an existing CapsuleAssignment.
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateCapsuleAssignmentDTO {
        private Long id;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private AssignmentStatus status;
        private boolean collaborationEnabled;
    }
}
