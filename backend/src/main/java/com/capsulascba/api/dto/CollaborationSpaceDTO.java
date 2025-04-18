package com.capsulascba.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CollaborationSpaceDTO {

    private Long id;
    private String name;
    private String description;
    private Long createdByUserId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
