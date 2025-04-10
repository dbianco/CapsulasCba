package com.capsulascba.api.repository;

import com.capsulascba.api.model.CapsuleAssignment;
import com.capsulascba.api.model.Content;
import com.capsulascba.api.model.WorkGroup;
import com.capsulascba.api.model.enums.AssignmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for CapsuleAssignment entity.
 */
@Repository
public interface CapsuleAssignmentRepository extends JpaRepository<CapsuleAssignment, Long> {

    /**
     * Find all active assignments for a work group
     * @param workGroup The work group to search for
     * @return List of active assignments
     */
    @Query("SELECT ca FROM CapsuleAssignment ca " +
           "WHERE ca.workGroup = :workGroup " +
           "AND ca.status = 'IN_PROGRESS' " +
           "AND ca.startDate <= :now " +
           "AND ca.endDate >= :now")
    List<CapsuleAssignment> findActiveAssignmentsByWorkGroup(
            @Param("workGroup") WorkGroup workGroup,
            @Param("now") LocalDateTime now);

    /**
     * Find all assignments for a capsule
     * @param capsule The capsule to search for
     * @return List of assignments
     */
    List<CapsuleAssignment> findByCapsule(Content capsule);

    /**
     * Find all assignments for a work group with a specific status
     * @param workGroup The work group to search for
     * @param status The status to filter by
     * @return List of assignments
     */
    List<CapsuleAssignment> findByWorkGroupAndStatus(WorkGroup workGroup, AssignmentStatus status);

    /**
     * Find an active assignment for a specific work group and capsule
     * @param workGroup The work group
     * @param capsule The capsule
     * @return Optional containing the assignment if found
     */
    @Query("SELECT ca FROM CapsuleAssignment ca " +
           "WHERE ca.workGroup = :workGroup " +
           "AND ca.capsule = :capsule " +
           "AND ca.status = 'IN_PROGRESS' " +
           "AND ca.startDate <= :now " +
           "AND ca.endDate >= :now")
    Optional<CapsuleAssignment> findActiveAssignment(
            @Param("workGroup") WorkGroup workGroup,
            @Param("capsule") Content capsule,
            @Param("now") LocalDateTime now);

    /**
     * Find assignments that are due to start
     * @param startDate The date to check
     * @return List of assignments starting on the given date
     */
    List<CapsuleAssignment> findByStartDateAndStatus(LocalDateTime startDate, AssignmentStatus status);

    /**
     * Find assignments that are due to end
     * @param endDate The date to check
     * @return List of assignments ending on the given date
     */
    List<CapsuleAssignment> findByEndDateAndStatus(LocalDateTime endDate, AssignmentStatus status);

    /**
     * Check if a work group has any active assignments
     * @param workGroup The work group to check
     * @return true if the group has active assignments
     */
    @Query("SELECT COUNT(ca) > 0 FROM CapsuleAssignment ca " +
           "WHERE ca.workGroup = :workGroup " +
           "AND ca.status = 'IN_PROGRESS' " +
           "AND ca.startDate <= :now " +
           "AND ca.endDate >= :now")
    boolean hasActiveAssignments(@Param("workGroup") WorkGroup workGroup, @Param("now") LocalDateTime now);
}
