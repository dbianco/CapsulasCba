package com.capsulascba.api.validator;

import com.capsulascba.api.dto.UpdateWorkGroupRequest;
import com.capsulascba.api.exception.ValidationException;
import com.capsulascba.api.model.WorkGroup;
import com.capsulascba.api.dto.UpdateMemberRequest;
import com.capsulascba.api.model.WorkGroupMember;
import com.capsulascba.api.model.User;
import com.capsulascba.api.model.enums.WorkGroupRole;
import com.capsulascba.api.model.enums.WorkGroupStatus;
import org.springframework.stereotype.Component;

@Component
public class WorkGroupValidator {

    public void validateWorkGroupUpdate(WorkGroup workGroup, UpdateWorkGroupRequest request) {
        if (request.getStatus() != null && request.getStatus() != workGroup.getStatus()) {
            // Add validation logic here
        }
    }

    public void validateMemberAddition(WorkGroup workGroup, User user) {
        if (workGroup.isActiveMember(user)) {
            throw new ValidationException("User is already an active member");
        }
    }

    public void validateMemberUpdate(
            WorkGroup workGroup,
            WorkGroupMember member,
            UpdateMemberRequest request
    ) {
        if (member.getRole() == WorkGroupRole.ORGANIZER &&
                request.getRole() != WorkGroupRole.ORGANIZER) {
            // Add validation logic here
        }
    }
}
