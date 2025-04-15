package com.capsulascba.api.dto;

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
public class ContentVersionDTO {

    private Long id;
    private Long contentId;
    private Integer versionNumber;
    private String changeDescription;
    private Long authorId;
    private String authorName;
    private List<ContentResourceDTO> resources;
    private LocalDateTime createdAt;
}
