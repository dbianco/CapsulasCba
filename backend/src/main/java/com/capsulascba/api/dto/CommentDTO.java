package com.capsulascba.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Long id;
    
    @NotNull(message = "Content ID is required")
    private Long contentId;
    
    @NotNull(message = "User ID is required")
    private Long userId;
    
    @NotNull(message = "Comment text is required")
    private String text;
    
    private Long parentId;
    
    private List<CommentDTO> replies;
    
    private Long likeCount;
    
    private boolean edited;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
