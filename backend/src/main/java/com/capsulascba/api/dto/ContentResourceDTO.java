package com.capsulascba.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContentResourceDTO {

    private Long id;
    private String name;
    private String url;
    private String type;
    private Long size;
    private String mimeType;
    private Long contentId;
    private Long versionId;
}
