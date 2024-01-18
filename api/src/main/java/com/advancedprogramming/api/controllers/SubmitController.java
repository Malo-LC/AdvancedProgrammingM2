package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.controllers.beans.MessageResponse;
import com.advancedprogramming.api.controllers.beans.SubmitResponse;
import com.advancedprogramming.api.models.Filedb;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.bean.RoleEnum;
import com.advancedprogramming.api.services.FileStorageService;
import com.advancedprogramming.api.services.SubmitService;
import com.advancedprogramming.api.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(path = "/submit")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class SubmitController {
    private final FileStorageService storageService;
    private final SubmitService submitService;
    private final UserService userService;

    @PostMapping("/upload/{reportId}")
    public ResponseEntity<MessageResponse> uploadFile(
        @RequestParam("file") MultipartFile file,
        @PathVariable Integer reportId,
        HttpServletRequest request
    ) {
        String token = userService.getTokenFromRequest(request);
        try {
            boolean success = submitService.uploadSubmit(token, reportId, file);
            String message;
            if (success) {
                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message, true));
            }
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message, false));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(e.getMessage(), false));
        }
    }

    @PutMapping("/update/{submitId}")
    public ResponseEntity<MessageResponse> acceptOrDeclineSubmitByTutor(
        @PathVariable Integer submitId,
        @RequestParam Boolean isAccepted,
        HttpServletRequest request
    ) {
        User user = userService.getUserByFromRequest(request);
        if (!RoleEnum.TUTOR.equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("You are not allowed to do this", false));
        }
        Boolean success = submitService.acceptOrDeclineSubmit(submitId, isAccepted, user);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Submit updated", true));
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse("Could not update submit", false));
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        Filedb fileDB = storageService.getFile(id);
        if (fileDB == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
            .body(fileDB.getData());
    }

    @GetMapping("/all")
    public ResponseEntity<List<SubmitResponse>> getListFiles(HttpServletRequest request) {
        String token = userService.getTokenFromRequest(request);
        List<SubmitResponse> submits = submitService.getSubmitsByUser(token);
        return ResponseEntity.status(HttpStatus.OK).body(submits);
    }
}
