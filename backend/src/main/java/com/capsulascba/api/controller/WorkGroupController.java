package com.capsulascba.api.controller;

import com.capsulascba.api.dto.WorkGroupDTO;
import com.capsulascba.api.service.WorkGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workgroups")
public class WorkGroupController {

    private final WorkGroupService workGroupService;

    @Autowired
    public WorkGroupController(WorkGroupService workGroupService) {
        this.workGroupService = workGroupService;
    }

    @GetMapping
    public ResponseEntity<List<WorkGroupDTO>> getAllWorkGroups() {
        return new ResponseEntity<>(workGroupService.getAllWorkGroups(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkGroupDTO> getWorkGroupById(@PathVariable Long id) {
        return new ResponseEntity<>(workGroupService.getWorkGroupById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<WorkGroupDTO> createWorkGroup(@RequestBody WorkGroupDTO workGroupDTO) {
        return new ResponseEntity<>(workGroupService.createWorkGroup(workGroupDTO, 1L), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkGroupDTO> updateWorkGroup(@PathVariable Long id, @RequestBody WorkGroupDTO workGroupDTO) {
        return new ResponseEntity<>(workGroupService.updateWorkGroup(id, workGroupDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkGroup(@PathVariable Long id) {
        workGroupService.deleteWorkGroup(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
