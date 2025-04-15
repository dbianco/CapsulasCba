package com.capsulascba.api.dto;

import com.capsulascba.api.model.enums.WorkGroupRole;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WorkGroupMemberDTO {
    private Long id;
    private UserDTO user;
    private WorkGroupRole role;
    private boolean active;
    private LocalDateTime joinedAt;
}
