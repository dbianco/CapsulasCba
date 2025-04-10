package com.capsulascba.api.repository;

import com.capsulascba.api.model.CapsuleAssignment;
import com.capsulascba.api.model.CollaborationSpace;
import com.capsulascba.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for CollaborationSpace entity.
 */
@Repository
public interface CollaborationSpaceRepository extends JpaRepository<CollaborationSpace, Long> {

    /**
     * Find the collaboration space for a specific assignment
     * @param assignment The assignment to search for
     * @return Optional containing the space if found
     */
    Optional<CollaborationSpace> findByAssignment(CapsuleAssignment assignment);

    /**
     * Find all active collaboration spaces where a user has participated
     * @param user The user to search for
     * @return List of active spaces with user participation
     */
    @Query("SELECT DISTINCT cs FROM CollaborationSpace cs " +
           "JOIN cs.comments c " +
           "WHERE c.author = :user " +
           "AND cs.active = true " +
           "AND cs.assignment.status = 'IN_PROGRESS'")
    List<CollaborationSpace> findActiveSpacesByParticipant(@Param("user") User user);

    /**
     * Find all active collaboration spaces for a list of assignments
     * @param assignments The assignments to search for
     * @return List of active spaces
     */
    @Query("SELECT cs FROM CollaborationSpace cs " +
           "WHERE cs.assignment IN :assignments " +
           "AND cs.active = true")
    List<CollaborationSpace> findActiveSpacesByAssignments(@Param("assignments") List<CapsuleAssignment> assignments);

    /**
     * Check if a collaboration space exists and is active for an assignment
     * @param assignment The assignment to check
     * @return true if an active space exists
     */
    boolean existsByAssignmentAndActiveTrue(CapsuleAssignment assignment);

    /**
     * Count the number of active participants in a collaboration space
     * @param space The space to check
     * @return The number of unique participants
     */
    @Query("SELECT COUNT(DISTINCT c.author) FROM Comment c " +
           "WHERE c.space = :space")
    long countParticipants(@Param("space") CollaborationSpace space);

    /**
     * Find all collaboration spaces that need to be archived
     * (spaces with completed or cancelled assignments)
     * @return List of spaces to archive
     */
    @Query("SELECT cs FROM CollaborationSpace cs " +
           "WHERE cs.active = true " +
           "AND (cs.assignment.status = 'COMPLETED' " +
           "OR cs.assignment.status = 'CANCELLED')")
    List<CollaborationSpace> findSpacesToArchive();
}
