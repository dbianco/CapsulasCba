package com.capsulascba.api.mapper;

import com.capsulascba.api.dto.WorkGroupDTO;
import com.capsulascba.api.dto.WorkGroupDetailDTO;
import com.capsulascba.api.dto.WorkGroupMemberDTO;
import com.capsulascba.api.model.User;
import com.capsulascba.api.model.WorkGroup;
import com.capsulascba.api.model.WorkGroupMember;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface WorkGroupMapper {

    @Mapping(target = "id", source = "workGroup.id")
    WorkGroupDTO toDTO(WorkGroup workGroup);

    WorkGroupDetailDTO toDetailDTO(WorkGroup workGroup);

    @Mapping(target = "user.id", source = "member.user.id")
    @Mapping(target = "user.username", source = "member.user.username")
    WorkGroupMemberDTO toMemberDTO(WorkGroupMember member);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", source = "dto.name")
    @Mapping(target = "description", source = "dto.description")
    @Mapping(target = "status", source = "dto.status")
    @Mapping(target = "members", ignore = true)
    @Mapping(target = "assignments", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    WorkGroup toEntity(WorkGroupDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", source = "dto.name")
    @Mapping(target = "description", source = "dto.description")
    @Mapping(target = "status", source = "dto.status")
    @Mapping(target = "members", ignore = true)
    @Mapping(target = "assignments", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(@MappingTarget WorkGroup workGroup, WorkGroupDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "workGroup", source = "workGroup")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "role", source = "dto.role")
    @Mapping(target = "active", constant = "true")
    @Mapping(target = "joinedAt", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "createdAt", ignore = true)
    WorkGroupMember toMemberEntity(WorkGroupMemberDTO dto, User user, WorkGroup workGroup);
}
