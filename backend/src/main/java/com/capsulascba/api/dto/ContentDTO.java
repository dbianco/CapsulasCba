package com.capsulascba.api.dto;

import com.capsulascba.api.model.enums.ContentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContentDTO {

    private Long id;
    private String title;
    private String description;
    private ContentType type;
    private Long authorId;
    private String authorName;
    private List<ContentResourceDTO> resources;
    private List<Long> collaborationSpaceIds;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long currentVersionId;
    private Integer version;
}
