package com.advancedprogramming.api.services;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

import com.advancedprogramming.api.models.FileDB;
import com.advancedprogramming.api.models.FileDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    @Autowired
    private FileDBRepository fileDBRepository;

    public void store(MultipartFile file) throws IOException {
        if (file == null) {
            throw new IOException("File is null");
        }
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        FileDB FileDB = new FileDB(fileName, file.getContentType(), file.getBytes());
        fileDBRepository.save(FileDB);
    }

    public FileDB getFile(String id) {
        return fileDBRepository.findById(id).orElseThrow();
    }

    public List<FileDB> getAllFiles() {
        return fileDBRepository.findAll();
    }
}
