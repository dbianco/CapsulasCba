package com.capsulascba.api.mapper;

import com.capsulascba.api.dto.CommentDTO;
import com.capsulascba.api.model.Comment;
import com.capsulascba.api.model.CollaborationSpace;
import com.capsulascba.api.model.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = {})
public interface CommentMapper {

    @Mapping(target = "id", source = "id")
    @Mapping(target = "spaceId", source = "space.id")
    @Mapping(target = "authorId", source = "author.id")
    @Mapping(target = "text", source = "text")
    @Mapping(target = "parentId", source = "parent.id")
    @Mapping(target = "likeCount", source = "likeCount")
    @Mapping(target = "edited", source = "edited")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "updatedAt", source = "updatedAt")
    @Mapping(target = "replies", ignore = true)
    CommentDTO toDTO(Comment comment);

    @Mapping(target = "space", ignore = true)
    @Mapping(target = "author", ignore = true)
    @Mapping(target = "parent", ignore = true)
    @Mapping(target = "replies", ignore = true)
    Comment toEntity(CommentDTO dto, @Context CollaborationSpace space, @Context User author, @Context Comment parent);

    List<CommentDTO> toDTOList(List<Comment> comments);

    @AfterMapping
    default void setReplies(Comment comment, @MappingTarget CommentDTO commentDTO) {
        if (comment.getReplies() != null) {
            commentDTO.setReplies(toDTOList(comment.getReplies()));
        }
    }

    @AfterMapping
    default void setReferences(CommentDTO dto, @MappingTarget Comment comment,
                             @Context CollaborationSpace space,
                             @Context User author,
                             @Context Comment parent) {
        comment.setSpace(space);
        comment.setAuthor(author);
        comment.setParent(parent);
        comment.setLikeCount(dto.getLikeCount() != null ? dto.getLikeCount() : 0L);
    }
}
