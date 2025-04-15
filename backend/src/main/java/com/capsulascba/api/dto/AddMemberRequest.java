package com.capsulascba.api.dto;

import com.capsulascba.api.model.enums.WorkGroupRole;
import lombok.Data;

@Data
public class AddMemberRequest {
    private Long userId;
    private WorkGroupRole role;
}
