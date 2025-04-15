package com.capsulascba.api.mapper;

import com.capsulascba.api.dto.CapsuleAssignmentDTO;
import com.capsulascba.api.model.CapsuleAssignment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CapsuleAssignmentMapper {

    @Mapping(target = "capsuleId", source = "capsule.id")
    @Mapping(target = "workGroupId", source = "workGroup.id")
    @Mapping(target = "assignedByUserId", source = "assignedBy.id")
    @Mapping(target = "assignedToUserId", source = "assignedTo.id")
    CapsuleAssignmentDTO toDTO(CapsuleAssignment assignment);

    List<CapsuleAssignmentDTO> toDTOList(List<CapsuleAssignment> assignments);
}
