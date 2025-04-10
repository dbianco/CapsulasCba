package com.capsulascba.api.mapper;

import com.capsulascba.api.dto.CommentDTO;
import com.capsulascba.api.model.Comment;
import com.capsulascba.api.model.CollaborationSpace;
import com.capsulascba.api.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CommentMapper {
    
    public CommentDTO toDTO(Comment comment) {
        if (comment == null) {
            return null;
        }

        return CommentDTO.builder()
                .id(comment.getId())
                .spaceId(comment.getSpace().getId())
                .authorId(comment.getAuthor().getId())
                .text(comment.getText())
                .parentId(comment.getParent() != null ? comment.getParent().getId() : null)
                .replies(comment.getReplies() != null ? 
                        comment.getReplies().stream()
                                .map(this::toDTO)
                                .collect(Collectors.toList()) : 
                        null)
                .likeCount(comment.getLikeCount())
                .edited(comment.isEdited())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }

    public Comment toEntity(CommentDTO dto, CollaborationSpace space, User author, Comment parent) {
        if (dto == null) {
            return null;
        }

        return Comment.builder()
                .id(dto.getId())
                .space(space)
                .author(author)
                .text(dto.getText())
                .parent(parent)
                .likeCount(dto.getLikeCount() != null ? dto.getLikeCount() : 0L)
                .edited(dto.isEdited())
                .build();
    }

    public List<CommentDTO> toDTOList(List<Comment> comments) {
        if (comments == null) {
            return null;
        }
        return comments.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
