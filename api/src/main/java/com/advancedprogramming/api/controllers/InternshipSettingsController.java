package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.controllers.beans.MessageResponse;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.bean.RoleEnum;
import com.advancedprogramming.api.services.InternshipSettingsService;
import com.advancedprogramming.api.services.UserService;
import com.advancedprogramming.api.services.bean.InternshipSettings;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/internship")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class InternshipSettingsController {
    private final InternshipSettingsService internshipSettingsService;
    private final UserService userService;

    @GetMapping("/{internshipId}")
    public ResponseEntity<InternshipSettings> getInternshipSettings(
        @PathVariable Integer internshipId,
        HttpServletRequest request
    ) {
        User user = userService.getUserByFromRequest(request);
        if (user == null || !user.getRole().equals(RoleEnum.ADMIN)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        InternshipSettings internshipSettings = internshipSettingsService.getInternshipSettings(internshipId);
        if (internshipSettings == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(internshipSettings);
    }

    @PostMapping("/update")
    public ResponseEntity<MessageResponse> updateInternshipSettings(
        HttpServletRequest request,
        @RequestBody InternshipSettings internshipSettings
    ) {
        User user = userService.getUserByFromRequest(request);
        if (user == null || !user.getRole().equals(RoleEnum.ADMIN)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        Boolean success = internshipSettingsService.updateInternshipSettings(internshipSettings);
        if (Boolean.FALSE.equals(success)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Internship not found", false));
        }
        return ResponseEntity.ok(new MessageResponse("Internship updated", true));
    }
}
