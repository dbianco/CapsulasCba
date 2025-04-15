package com.capsulascba.api.service;

import com.capsulascba.api.dto.*;
import com.capsulascba.api.exception.NotFoundException;
import com.capsulascba.api.mapper.WorkGroupMapper;
import com.capsulascba.api.model.User;
import com.capsulascba.api.model.WorkGroup;
import com.capsulascba.api.model.WorkGroupMember;
import com.capsulascba.api.model.enums.WorkGroupRole;
import com.capsulascba.api.model.enums.WorkGroupStatus;
import com.capsulascba.api.repository.WorkGroupRepository;
import com.capsulascba.api.repository.UserRepository;
import com.capsulascba.api.validator.WorkGroupValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class WorkGroupService {

    @Autowired
    private WorkGroupRepository workGroupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkGroupMapper workGroupMapper;

    @Autowired
    private WorkGroupValidator workGroupValidator;

    public List<WorkGroupDTO> getAllWorkGroups() {
        return workGroupRepository.findAll().stream()
                .map(workGroupMapper::toDTO)
                .collect(Collectors.toList());
    }

    public WorkGroupDetailDTO getWorkGroupDetails(Long id) {
        WorkGroup workGroup = findWorkGroupOrThrow(id);
        return workGroupMapper.toDetailDTO(workGroup);
    }

    public WorkGroupDetailDTO updateWorkGroup(Long id, UpdateWorkGroupRequest request) {
        WorkGroup workGroup = findWorkGroupOrThrow(id);
        workGroupValidator.validateWorkGroupUpdate(workGroup, request);

        workGroup.setName(request.getName());
        workGroup.setDescription(request.getDescription());
        workGroup.setStatus(request.getStatus());

        return workGroupMapper.toDetailDTO(workGroupRepository.save(workGroup));
    }

    public List<WorkGroupMemberDTO> getMembers(Long id) {
        WorkGroup workGroup = findWorkGroupOrThrow(id);
        return workGroup.getMembers().stream()
                .map(workGroupMapper::toMemberDTO)
                .collect(Collectors.toList());
    }

    public WorkGroupMemberDTO addMember(Long groupId, AddMemberRequest request) {
        WorkGroup workGroup = findWorkGroupOrThrow(groupId);
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new NotFoundException("User not found"));

        workGroupValidator.validateMemberAddition(workGroup, user);

        WorkGroupMember member = workGroup.addMember(user, request.getRole());
        workGroupRepository.save(workGroup);

        return workGroupMapper.toMemberDTO(member);
    }

    public WorkGroupMemberDTO updateMember(
            Long groupId,
            Long memberId,
            UpdateMemberRequest request
    ) {
        WorkGroup workGroup = findWorkGroupOrThrow(groupId);
        WorkGroupMember member = findMemberOrThrow(workGroup, memberId);

        //validateMemberUpdate(workGroup, member, request);

        member.setRole(request.getRole());
        member.setActive(request.isActive());

        workGroupRepository.save(workGroup);
        return workGroupMapper.toMemberDTO(member);
    }

    public void removeMember(Long groupId, Long memberId) {
        WorkGroup workGroup = findWorkGroupOrThrow(groupId);
        WorkGroupMember member = findMemberOrThrow(workGroup, memberId);
        workGroup.getMembers().remove(member);
        workGroupRepository.save(workGroup);
    }

    public WorkGroupDTO createWorkGroup(WorkGroupDTO workGroupDTO) {
        WorkGroup workGroup = workGroupMapper.toEntity(workGroupDTO);
        WorkGroup savedWorkGroup = workGroupRepository.save(workGroup);
        return workGroupMapper.toDTO(savedWorkGroup);
    }

    public void deleteWorkGroup(Long id) {
        WorkGroup workGroup = workGroupRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Work group not found"));

        // Instead of deleting, set status to INACTIVE
        workGroup.setStatus(WorkGroupStatus.INACTIVE);
        workGroupRepository.save(workGroup);
    }

    private WorkGroup findWorkGroupOrThrow(Long id) {
        return workGroupRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Work group not found"));
    }

    private WorkGroupMember findMemberOrThrow(WorkGroup workGroup, Long memberId) {
        return workGroup.getMembers().stream()
                .filter(member -> member.getId().equals(memberId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Member not found"));
    }
}
