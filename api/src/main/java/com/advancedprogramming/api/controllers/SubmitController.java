package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.controllers.beans.MessageResponse;
import com.advancedprogramming.api.controllers.beans.SubmitApproveBody;
import com.advancedprogramming.api.controllers.beans.SubmitFileBody;
import com.advancedprogramming.api.controllers.beans.SubmitResponse;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.bean.RoleEnum;
import com.advancedprogramming.api.services.FileStorageService;
import com.advancedprogramming.api.services.SubmitService;
import com.advancedprogramming.api.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/submit")
@CrossOrigin(origins = "*")
@Tag(name = "Submit")
@RequiredArgsConstructor
public class SubmitController {
    private final FileStorageService storageService;
    private final SubmitService submitService;
    private final UserService userService;

    @Operation(summary = "Upload a file")
    @PostMapping("/upload/{studentInternshipId}")
    public ResponseEntity<MessageResponse> uploadFile(
        @Valid @RequestBody SubmitFileBody body,
        @PathVariable Integer studentInternshipId,
        HttpServletRequest request
    ) {
        String token = userService.getTokenFromRequest(request);
        try {
            boolean success = submitService.uploadSubmit(token, studentInternshipId, body);
            String message;
            if (success) {
                message = "Uploaded the file successfully: " + body.file().name();
                return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message, true));
            }
            message = "Could not upload the file: " + body.file().name() + " !";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message, false));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(e.getMessage(), false));
        }
    }

    @Operation(summary = "Approve or decline a submit by tutor, by submit id")
    @PutMapping("/approve/{submitId}")
    public ResponseEntity<MessageResponse> acceptOrDeclineSubmitByTutor(
        @PathVariable Integer submitId,
        @RequestBody SubmitApproveBody body,
        HttpServletRequest request
    ) {
        User user = userService.getUserByFromRequest(request);
        if (!RoleEnum.TUTOR.equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("You are not allowed to do this", false));
        }
        Boolean success = submitService.acceptOrDeclineSubmit(submitId, body.isApproved(), user);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Submit updated", true));
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse("Could not update submit", false));
    }

    @Operation(summary = "Get all submits by user")
    @GetMapping("/all")
    public ResponseEntity<List<SubmitResponse>> getListFiles(HttpServletRequest request) {
        User user = userService.getUserByFromRequest(request);
        List<SubmitResponse> submits = submitService.getSubmitsByUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(submits);
    }

    @Operation(summary = "Get submits to validate by tutor")
    @GetMapping("/to-validate")
    public ResponseEntity<List<SubmitResponse>> getListFilesOfTutor(HttpServletRequest request) {
        User user = userService.getUserByFromRequest(request);
        List<SubmitResponse> submits = submitService.getSubmitToValidate(user);
        return ResponseEntity.status(HttpStatus.OK).body(submits);
    }

    @GetMapping("/download/{submitId}")
    public ResponseEntity<String> getFile(@PathVariable Integer submitId, HttpServletRequest request) {
        User user = userService.getUserByFromRequest(request);
        String file = submitService.downloadSubmit(submitId, user);
        if (file == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(file);
    }
}
