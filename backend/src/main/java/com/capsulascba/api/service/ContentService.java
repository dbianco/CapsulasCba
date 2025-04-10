package com.capsulascba.api.service;

import com.capsulascba.api.model.Content;
import com.capsulascba.api.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ContentService {
    private final ContentRepository contentRepository;

    @Autowired
    private SqsService sqsService;

    @Autowired
    private S3Service s3Service;

    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public Content saveContent(Content content, MultipartFile file) throws IOException {
        String key = UUID.randomUUID().toString();
        String resourceUrl = s3Service.uploadFile(key, file.getInputStream(), file.getContentType());
        content.setResourceUrl(resourceUrl);

        Content savedContent = contentRepository.save(content);
        sqsService.sendMessage("New content created with id: " + savedContent.getId());
        return savedContent;
    }

    public Optional<Content> getContentById(Long id) {
        return contentRepository.findById(id);
    }

    public List<Content> getAllContents() {
        return contentRepository.findAll();
    }
}
