package com.capsulascba.api.service;

import com.capsulascba.api.model.Content;
import com.capsulascba.api.model.ContentVersion;
import com.capsulascba.api.model.User;
import com.capsulascba.api.repository.ContentRepository;
import com.capsulascba.api.repository.ContentVersionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ContentService {
    private final ContentRepository contentRepository;
    private final ContentVersionRepository contentVersionRepository;

    @Autowired
    private SqsService sqsService;

    @Autowired
    private S3Service s3Service;

    public ContentService(ContentRepository contentRepository, ContentVersionRepository contentVersionRepository) {
        this.contentRepository = contentRepository;
        this.contentVersionRepository = contentVersionRepository;
    }

    @Transactional
    public Content saveContent(Content content, MultipartFile file, User author) throws IOException {
        String key = UUID.randomUUID().toString();
        String resourceUrl = s3Service.uploadFile(key, file.getInputStream(), file.getContentType());
        content.setResourceUrl(resourceUrl);
        content.setAuthor(author);

        Content savedContent = contentRepository.save(content);

        // Create initial version
        ContentVersion initialVersion = new ContentVersion();
        initialVersion.setContent(savedContent);
        initialVersion.setVersionNumber(1);
        initialVersion.setContentData(content.getContent());
        initialVersion.setCreatedBy(author);
        initialVersion.setCurrent(true);
        contentVersionRepository.save(initialVersion);

        sqsService.sendMessage("New content created with id: " + savedContent.getId());
        return savedContent;
    }

    @Transactional
    public ContentVersion createNewVersion(Long contentId, String newContent, User author, String changeDescription) {
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new RuntimeException("Content not found"));

        // Set all existing versions to not current
        contentVersionRepository.setAllVersionsNotCurrent(contentId);

        ContentVersion newVersion = new ContentVersion();
        newVersion.setContent(content);
        newVersion.setVersionNumber(content.getVersions().size() + 1);
        newVersion.setContentData(newContent);
        newVersion.setCreatedBy(author);
        newVersion.setChangeDescription(changeDescription);
        newVersion.setCurrent(true);

        return contentVersionRepository.save(newVersion);
    }

    @Transactional
    public ContentVersion publishVersion(Long versionId, User publisher) {
        ContentVersion version = contentVersionRepository.findById(versionId)
                .orElseThrow(() -> new RuntimeException("Version not found"));

        version.setPublished(true);
        version.setApprovedBy(publisher);
        version.setApprovedAt(LocalDateTime.now());

        return contentVersionRepository.save(version);
    }

    @Transactional
    public ContentVersion approveVersion(Long versionId, User approver) {
        ContentVersion version = contentVersionRepository.findById(versionId)
                .orElseThrow(() -> new RuntimeException("Version not found"));

        version.setApproved(true);
        version.setApprovedBy(approver);
        version.setApprovedAt(LocalDateTime.now());

        return contentVersionRepository.save(version);
    }

    public Optional<Content> getContentById(Long id) {
        return contentRepository.findById(id);
    }

    public Optional<ContentVersion> getVersionById(Long versionId) {
        return contentVersionRepository.findById(versionId);
    }

    public ContentVersion getCurrentVersion(Long contentId) {
        return contentVersionRepository.findCurrentVersion(contentId)
                .orElseThrow(() -> new RuntimeException("No current version found for content"));
    }

    public List<ContentVersion> getAllVersions(Long contentId) {
        return contentVersionRepository.findAllByContentIdOrderByVersionNumberDesc(contentId);
    }

    public List<Content> getAllContents() {
        return contentRepository.findAll();
    }
}
