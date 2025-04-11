package com.capsulascba.api.controller;

import com.capsulascba.api.model.Content;
import com.capsulascba.api.model.User;
import com.capsulascba.api.service.ContentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contents")
public class ContentController {
    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Content> createContent(
            @RequestPart("content") Content content,
            @RequestPart("file") MultipartFile file,
            @AuthenticationPrincipal User author) throws IOException {
        Content createdContent = contentService.saveContent(content, file, author);
        return new ResponseEntity<>(createdContent, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Content> getAllContents() {
        return contentService.getAllContents();
    }

    @GetMapping("/{id}")
    public Optional<Content> getContentById(Long id) {
        return contentService.getContentById(id);
    }
}
