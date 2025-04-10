package com.capsulascba.api.dto;

import jakarta.validation.constraints.NotNull;
import java.util.Date;
import lombok.Data;

@Data
public class CommentDTO {
    @NotNull(message = "ID is required")
    private String id;
    
    @NotNull(message = "Content is required")
    private String content;
    
    @NotNull(message = "Author is required")
    private String author;
    
    @NotNull(message = "Creation date cannot be null")
    private Date creationDate;
    
    @NotNull(message = "Status is required")
    private String status;
}
