package com.capsulascba.api.mapper;

import com.capsulascba.api.dto.ContentDTO;
import com.capsulascba.api.dto.ContentResourceDTO;
import com.capsulascba.api.dto.ContentVersionDTO;
import com.capsulascba.api.model.CapsuleAssignment;
import com.capsulascba.api.model.CollaborationSpace;
import com.capsulascba.api.model.Content;
import com.capsulascba.api.model.ContentResource;
import com.capsulascba.api.model.ContentVersion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(
    componentModel = "spring",
    imports = {
        CapsuleAssignment.class,
        CollaborationSpace.class,
        java.util.stream.Collectors.class
    }
)
public interface ContentMapper {

    @Mapping(target = "authorName", source = "author.username")
    @Mapping(target = "authorId", source = "author.id")
    @Mapping(target = "collaborationSpaceIds", expression = "java(content.getAssignments().stream().map(CapsuleAssignment::getCollaborationSpace).filter(space -> space != null).map(CollaborationSpace::getId).collect(java.util.stream.Collectors.toList()))")
    @Mapping(target = "currentVersionId", expression = "java(getCurrentVersionId(content))")
    @Mapping(target = "version", expression = "java(getCurrentVersionNumber(content))")
    ContentDTO toDTO(Content content);

    default Long getCurrentVersionId(Content content) {
        return content.getVersions().stream()
                .filter(ContentVersion::isCurrent)
                .map(ContentVersion::getId)
                .findFirst()
                .orElse(null);
    }

    default Integer getCurrentVersionNumber(Content content) {
        return content.getVersions().stream()
                .filter(ContentVersion::isCurrent)
                .map(ContentVersion::getVersionNumber)
                .findFirst()
                .orElse(null);
    }

    @Mapping(target = "contentId", source = "content.id")
    @Mapping(target = "authorName", source = "createdBy.username")
    @Mapping(target = "authorId", source = "createdBy.id")
    ContentVersionDTO toVersionDTO(ContentVersion version);

    @Mapping(target = "contentId", source = "content.id")
    @Mapping(target = "versionId", expression = "java(getCurrentVersionId(resource.getContent()))")
    ContentResourceDTO toResourceDTO(ContentResource resource);

    List<ContentDTO> toDTOList(List<Content> contents);
    List<ContentVersionDTO> toVersionDTOList(List<ContentVersion> versions);
    List<ContentResourceDTO> toResourceDTOList(List<ContentResource> resources);
}
