package com.capsulascba.api.controller;

import com.capsulascba.api.dto.*;
import com.capsulascba.api.service.WorkGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import java.util.List;

@RestController
@RequestMapping(value = "/api/workgroups", produces = MediaType.APPLICATION_JSON_VALUE)
public class WorkGroupController {

    private final WorkGroupService workGroupService;

    @Autowired
    public WorkGroupController(WorkGroupService workGroupService) {
        this.workGroupService = workGroupService;
    }

    @GetMapping
    public ResponseEntity<List<WorkGroupDTO>> getAllWorkGroups() {
        List<WorkGroupDTO> workGroups = workGroupService.getAllWorkGroups();
        return new ResponseEntity<>(workGroups, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkGroupDetailDTO> getWorkGroup(@PathVariable Long id) {
        WorkGroupDetailDTO workGroup = workGroupService.getWorkGroupDetails(id);
        return new ResponseEntity<>(workGroup, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkGroupDetailDTO> updateWorkGroup(
            @PathVariable Long id,
            @RequestBody UpdateWorkGroupRequest request
    ) {
        WorkGroupDetailDTO updatedWorkGroup = workGroupService.updateWorkGroup(id, request);
        return new ResponseEntity<>(updatedWorkGroup, HttpStatus.OK);
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<List<WorkGroupMemberDTO>> getMembers(@PathVariable Long id) {
        List<WorkGroupMemberDTO> members = workGroupService.getMembers(id);
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @PostMapping("/{id}/members")
    public ResponseEntity<WorkGroupMemberDTO> addMember(
            @PathVariable Long id,
            @RequestBody AddMemberRequest request
    ) {
        WorkGroupMemberDTO newMember = workGroupService.addMember(id, request);
        return new ResponseEntity<>(newMember, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/members/{memberId}")
    public ResponseEntity<WorkGroupMemberDTO> updateMember(
            @PathVariable Long id,
            @PathVariable Long memberId,
            @RequestBody UpdateMemberRequest request
    ) {
        WorkGroupMemberDTO updatedMember = workGroupService.updateMember(id, memberId, request);
        return new ResponseEntity<>(updatedMember, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/members/{memberId}")
    public ResponseEntity<Void> removeMember(
            @PathVariable Long id,
            @PathVariable Long memberId
    ) {
        workGroupService.removeMember(id, memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WorkGroupDTO> createWorkGroup(@RequestBody WorkGroupDTO workGroupDTO) {
        WorkGroupDTO createdWorkGroup = workGroupService.createWorkGroup(workGroupDTO);
        return new ResponseEntity<>(createdWorkGroup, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkGroup(@PathVariable Long id) {
        workGroupService.deleteWorkGroup(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
