package com.capsulascba.api.dto;

import com.capsulascba.api.model.enums.WorkGroupStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class WorkGroupDetailDTO {
    private Long id;
    private String name;
    private String description;
    private WorkGroupStatus status;
    private List<WorkGroupMemberDTO> members;
    private List<CapsuleAssignmentDTO> assignments;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
