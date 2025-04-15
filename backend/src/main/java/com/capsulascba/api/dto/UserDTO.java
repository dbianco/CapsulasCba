package com.capsulascba.api.dto;

import com.capsulascba.api.model.enums.EducationLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String profileImageUrl;
    private String location;
    private String aboutMe;
    private EducationLevel educationLevel;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
