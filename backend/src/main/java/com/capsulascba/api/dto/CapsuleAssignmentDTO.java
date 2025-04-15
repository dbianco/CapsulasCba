package com.capsulascba.api.dto;

import com.capsulascba.api.model.enums.AssignmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CapsuleAssignmentDTO {

    private Long id;
    private Long capsuleId;
    private Long workGroupId;
    private Long assignedByUserId;
    private Long assignedToUserId;
    private AssignmentStatus status;
    private LocalDateTime deadline;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
