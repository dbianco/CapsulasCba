package com.capsulascba.api.repository;

import com.capsulascba.api.model.ContentVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContentVersionRepository extends JpaRepository<ContentVersion, Long> {

    @Modifying
    @Query("UPDATE ContentVersion cv SET cv.current = false WHERE cv.content.id = :contentId")
    void setAllVersionsNotCurrent(Long contentId);

    @Query("SELECT cv FROM ContentVersion cv WHERE cv.content.id = :contentId AND cv.current = true")
    Optional<ContentVersion> findCurrentVersion(Long contentId);

    List<ContentVersion> findAllByContentIdOrderByVersionNumberDesc(Long contentId);
}
