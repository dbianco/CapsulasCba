package com.capsulascba.api.dto;

import com.capsulascba.api.model.enums.WorkGroupStatus;
import lombok.Data;

@Data
public class UpdateWorkGroupRequest {
    private String name;
    private String description;
    private WorkGroupStatus status;
}
