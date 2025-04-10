package com.capsulascba.api.dto;

import com.capsulascba.api.model.enums.WorkGroupStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for the WorkGroup entity.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkGroupDTO {

    private Long id;
    private String name;
    private String description;
    private WorkGroupStatus status;
    private List<WorkGroupMemberDTO> members;
    private List<Long> assignmentIds;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /**
     * DTO for WorkGroupMember entity.
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WorkGroupMemberDTO {
        private Long id;
        private Long userId;
        private String userName;
        private String role;
        private boolean active;
        private LocalDateTime joinedAt;
    }
}
