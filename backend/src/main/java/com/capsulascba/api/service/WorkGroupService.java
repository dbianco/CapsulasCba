package com.capsulascba.api.service;

import com.capsulascba.api.dto.WorkGroupDTO;
import com.capsulascba.api.model.WorkGroup;
import com.capsulascba.api.model.WorkGroupMember;
import com.capsulascba.api.model.User;
import com.capsulascba.api.model.enums.WorkGroupRole;
import com.capsulascba.api.model.enums.WorkGroupStatus;
import com.capsulascba.api.repository.WorkGroupRepository;
import com.capsulascba.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkGroupService {

    @Autowired
    private WorkGroupRepository workGroupRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public WorkGroupDTO createWorkGroup(WorkGroupDTO workGroupDTO, Long creatorId) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        WorkGroup workGroup = new WorkGroup();
        workGroup.setName(workGroupDTO.getName());
        workGroup.setDescription(workGroupDTO.getDescription());
        workGroup.setStatus(WorkGroupStatus.ACTIVE);

        WorkGroup savedWorkGroup = workGroupRepository.save(workGroup);

        // Add creator as organizer
        savedWorkGroup.addMember(creator, WorkGroupRole.ORGANIZER);

        return mapToDTO(savedWorkGroup);
    }

    @Transactional(readOnly = true)
    public WorkGroupDTO getWorkGroupById(Long id) {
        WorkGroup workGroup = workGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work group not found"));
        return mapToDTO(workGroup);
    }

    @Transactional(readOnly = true)
    public List<WorkGroupDTO> getAllWorkGroups() {
        return workGroupRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public WorkGroupDTO updateWorkGroup(Long id, WorkGroupDTO workGroupDTO) {
        WorkGroup workGroup = workGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work group not found"));

        workGroup.setName(workGroupDTO.getName());
        workGroup.setDescription(workGroupDTO.getDescription());
        workGroup.setStatus(workGroupDTO.getStatus());

        WorkGroup updatedWorkGroup = workGroupRepository.save(workGroup);
        return mapToDTO(updatedWorkGroup);
    }

    @Transactional
    public void deleteWorkGroup(Long id) {
        WorkGroup workGroup = workGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work group not found"));

        // Instead of deleting, set status to INACTIVE
        workGroup.setStatus(WorkGroupStatus.INACTIVE);
        workGroupRepository.save(workGroup);
    }

    @Transactional
    public WorkGroupDTO addMember(Long groupId, Long userId, WorkGroupRole role) {
        WorkGroup workGroup = workGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Work group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        workGroup.addMember(user, role);
        WorkGroup updatedWorkGroup = workGroupRepository.save(workGroup);
        return mapToDTO(updatedWorkGroup);
    }

    @Transactional
    public WorkGroupDTO removeMember(Long groupId, Long userId) {
        WorkGroup workGroup = workGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Work group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        workGroup.getMembers().removeIf(member -> member.getUser().equals(user));
        WorkGroup updatedWorkGroup = workGroupRepository.save(workGroup);
        return mapToDTO(updatedWorkGroup);
    }

    private WorkGroupDTO mapToDTO(WorkGroup workGroup) {
        return WorkGroupDTO.builder()
                .id(workGroup.getId())
                .name(workGroup.getName())
                .description(workGroup.getDescription())
                .status(workGroup.getStatus())
                .members(workGroup.getMembers().stream()
                        .map(this::mapMemberToDTO)
                        .collect(Collectors.toList()))
                .assignmentIds(workGroup.getAssignments().stream()
                        .map(assignment -> assignment.getId())
                        .collect(Collectors.toList()))
                .createdAt(workGroup.getCreatedAt())
                .updatedAt(workGroup.getUpdatedAt())
                .build();
    }

    private WorkGroupDTO.WorkGroupMemberDTO mapMemberToDTO(WorkGroupMember member) {
        return WorkGroupDTO.WorkGroupMemberDTO.builder()
                .id(member.getId())
                .userId(member.getUser().getId())
                .userName(member.getUser().getUsername())
                .role(member.getRole().name())
                .active(member.isActive())
                .joinedAt(member.getJoinedAt())
                .build();
    }
}
