package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.models.Filedb;
import com.advancedprogramming.api.services.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/files")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class FilesController {
    private final FileStorageService storageService;

    @GetMapping("/{id}")
    public ResponseEntity<String> getFile(@PathVariable String id) {
        Filedb fileDB = storageService.getFile(id);
        if (fileDB == null) {
            return ResponseEntity.notFound().build();
        }

        String base64 = new String(fileDB.getData());

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
            .body(base64);
    }

}
