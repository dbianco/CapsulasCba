package com.capsulascba.api.service;

import com.capsulascba.api.model.Content;
import com.capsulascba.api.repository.ContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContentService {
    private final ContentRepository contentRepository;

    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public Content saveContent(Content content) {
        return contentRepository.save(content);
    }

    public Optional<Content> getContentById(Long id) {
        return contentRepository.findById(id);
    }

    public List<Content> getAllContents() {
        return contentRepository.findAll();
    }
}
