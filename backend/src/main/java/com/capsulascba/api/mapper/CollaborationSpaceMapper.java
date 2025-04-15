package com.capsulascba.api.mapper;

import com.capsulascba.api.dto.CollaborationSpaceDTO;
import com.capsulascba.api.model.CollaborationSpace;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CollaborationSpaceMapper {

    @Mapping(target = "createdByUserId", source = "assignment.assignedBy.id")
    CollaborationSpaceDTO toDTO(CollaborationSpace space);

    List<CollaborationSpaceDTO> toDTOList(List<CollaborationSpace> spaces);
}
