package com.capsulascba.api.service;

import com.capsulascba.api.dto.CommentDTO;
import com.capsulascba.api.mapper.CommentMapper;
import com.capsulascba.api.model.Comment;
import com.capsulascba.api.model.Content;
import com.capsulascba.api.model.User;
import com.capsulascba.api.repository.CommentRepository;
import com.capsulascba.api.repository.ContentRepository;
import com.capsulascba.api.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final ContentRepository contentRepository;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;

    public CommentService(CommentRepository commentRepository, ContentRepository contentRepository,
                          UserRepository userRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.contentRepository = contentRepository;
        this.userRepository = userRepository;
        this.commentMapper = commentMapper;
    }

    @Transactional
    public CommentDTO saveComment(CommentDTO commentDTO) {
        Content content = contentRepository.findById(commentDTO.getContentId())
                .orElseThrow(() -> new RuntimeException("Content not found"));
        User user = userRepository.findById(commentDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Comment parent = commentDTO.getParentId() != null ?
                commentRepository.findById(commentDTO.getParentId())
                        .orElseThrow(() -> new RuntimeException("Parent comment not found")) : null;

        Comment comment = commentMapper.toEntity(commentDTO, content, user, parent);
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
