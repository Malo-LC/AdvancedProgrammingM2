package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.models.Filedb;
import com.advancedprogramming.api.services.FileStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Files")
@RequiredArgsConstructor
public class FilesController {
    private final FileStorageService storageService;

    @Operation(summary = "Get a file by id")
    @GetMapping("/{id}")
    public ResponseEntity<String> getFile(@Parameter(description = "id of the file to be retrieved") @PathVariable String id) {
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
