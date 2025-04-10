package com.capsulascba.api.repository;

import com.capsulascba.api.model.WorkGroup;
import com.capsulascba.api.model.User;
import com.capsulascba.api.model.enums.WorkGroupStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for WorkGroup entity.
 */
@Repository
public interface WorkGroupRepository extends JpaRepository<WorkGroup, Long> {

    /**
     * Find all active groups where the user is an active member
     * @param user The user to search for
     * @return List of active groups where the user is a member
     */
    @Query("SELECT DISTINCT wg FROM WorkGroup wg " +
           "JOIN wg.members m " +
           "WHERE m.user = :user " +
           "AND m.active = true " +
           "AND wg.status = 'ACTIVE'")
    List<WorkGroup> findActiveGroupsByMember(@Param("user") User user);

    /**
     * Find all groups where the user is an active organizer
     * @param user The user to search for
     * @return List of groups where the user is an organizer
     */
    @Query("SELECT DISTINCT wg FROM WorkGroup wg " +
           "JOIN wg.members m " +
           "WHERE m.user = :user " +
           "AND m.active = true " +
           "AND m.role = 'ORGANIZER'")
    List<WorkGroup> findGroupsByOrganizer(@Param("user") User user);

    /**
     * Find all active groups
     * @return List of active groups
     */
    List<WorkGroup> findByStatus(WorkGroupStatus status);

    /**
     * Find a group by its name
     * @param name The name to search for
     * @return Optional containing the group if found
     */
    Optional<WorkGroup> findByName(String name);

    /**
     * Check if a group name is already taken
     * @param name The name to check
     * @return true if the name is already in use
     */
    boolean existsByName(String name);
}
