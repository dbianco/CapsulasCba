package com.capsulascba.api.model;

import com.capsulascba.api.model.enums.WorkGroupRole;
import com.capsulascba.api.model.enums.WorkGroupStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * Entity class representing a work group in the system.
 */
@Entity
@Table(name = "work_groups")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WorkGroupStatus status;

    @OneToMany(mappedBy = "workGroup", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<WorkGroupMember> members = new HashSet<>();

    @OneToMany(mappedBy = "workGroup", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CapsuleAssignment> assignments = new HashSet<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Helper method to add a member to the group
     * @param user The user to add
     * @param role The role of the user in the group
     * @return The created WorkGroupMember
     */
    public WorkGroupMember addMember(User user, WorkGroupRole role) {
        WorkGroupMember member = WorkGroupMember.builder()
                .workGroup(this)
                .user(user)
                .role(role)
                .active(true)
                .joinedAt(LocalDateTime.now())
                .build();
        members.add(member);
        return member;
    }

    /**
     * Helper method to get all active organizers
     * @return Set of users who are active organizers
     */
    public Set<User> getActiveOrganizers() {
        return members.stream()
                .filter(m -> m.isActive() && m.getRole() == WorkGroupRole.ORGANIZER)
                .map(WorkGroupMember::getUser)
                .collect(java.util.stream.Collectors.toSet());
    }

    /**
     * Helper method to get all active members
     * @return Set of users who are active members
     */
    public Set<User> getActiveMembers() {
        return members.stream()
                .filter(WorkGroupMember::isActive)
                .map(WorkGroupMember::getUser)
                .collect(java.util.stream.Collectors.toSet());
    }

    /**
     * Helper method to check if a user is an active member
     * @param user The user to check
     * @return true if the user is an active member
     */
    public boolean isActiveMember(User user) {
        return members.stream()
                .anyMatch(m -> m.getUser().equals(user) && m.isActive());
    }

    /**
     * Helper method to check if a user is an active organizer
     * @param user The user to check
     * @return true if the user is an active organizer
     */
    public boolean isActiveOrganizer(User user) {
        return members.stream()
                .anyMatch(m -> m.getUser().equals(user)
                        && m.isActive()
                        && m.getRole() == WorkGroupRole.ORGANIZER);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkGroup workGroup = (WorkGroup) o;
        return Objects.equals(id, workGroup.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
