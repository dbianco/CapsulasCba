package com.capsulascba.api.service;

import com.capsulascba.api.dto.CommentDTO;
import com.capsulascba.api.mapper.CommentMapper;
import com.capsulascba.api.model.Comment;
import com.capsulascba.api.model.CollaborationSpace;
import com.capsulascba.api.model.User;
import com.capsulascba.api.repository.CommentRepository;
import com.capsulascba.api.repository.CollaborationSpaceRepository;
import com.capsulascba.api.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final CollaborationSpaceRepository collaborationSpaceRepository;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;

    public CommentService(CommentRepository commentRepository, CollaborationSpaceRepository collaborationSpaceRepository,
                          UserRepository userRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.collaborationSpaceRepository = collaborationSpaceRepository;
        this.userRepository = userRepository;
        this.commentMapper = commentMapper;
    }

    @Transactional
    public CommentDTO saveComment(CommentDTO commentDTO) {
        CollaborationSpace space = collaborationSpaceRepository.findById(commentDTO.getSpaceId())
                .orElseThrow(() -> new RuntimeException("Collaboration Space not found"));
        User user = userRepository.findById(commentDTO.getAuthorId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Comment parent = commentDTO.getParentId() != null ?
                commentRepository.findById(commentDTO.getParentId())
                        .orElseThrow(() -> new RuntimeException("Parent comment not found")) : null;

        Comment comment = commentMapper.toEntity(commentDTO, space, user, parent);
        Comment savedComment = commentRepository.save(comment);
        return commentMapper.toDTO(savedComment);
    }

    public Optional<CommentDTO> getCommentById(Long id) {
        return commentRepository.findById(id).map(commentMapper::toDTO);
    }

    public List<CommentDTO> getAllComments() {
        return commentMapper.toDTOList(commentRepository.findAll());
    }
}
