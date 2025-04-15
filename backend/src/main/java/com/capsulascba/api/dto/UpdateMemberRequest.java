package com.capsulascba.api.dto;

import com.capsulascba.api.model.enums.WorkGroupRole;
import lombok.Data;

@Data
public class UpdateMemberRequest {
    private WorkGroupRole role;
    private boolean active;
}
