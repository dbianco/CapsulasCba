package com.capsulascba.api.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class UserDTO {
    @NotNull(message = "ID is required")
    private String id;
    
    @NotNull(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;
    
    @NotNull(message = "Email cannot be empty")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotNull(message = "Roles are required")
    private String[] roles;
}
