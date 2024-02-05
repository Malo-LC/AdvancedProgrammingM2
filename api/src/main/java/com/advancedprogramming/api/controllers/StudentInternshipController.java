package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.controllers.beans.MessageResponse;
import com.advancedprogramming.api.controllers.beans.StudentInternshipRequest;
import com.advancedprogramming.api.controllers.beans.StudentInternshipResponse;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.bean.RoleEnum;
import com.advancedprogramming.api.services.StudentInternshipService;
import com.advancedprogramming.api.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping(path = "/studentInternship")
@CrossOrigin(origins = "*")
@Tag(name = "Student Internship")
@RequiredArgsConstructor
public class StudentInternshipController {
    private final StudentInternshipService studentInternshipService;
    private final UserService userService;

    @PostMapping("/create")
    @Operation(summary = "Create student internship")
    public ResponseEntity<MessageResponse> createStudentInternship(
        @Valid @RequestBody StudentInternshipRequest request, HttpServletRequest httpRequest) {
        try {
            User user = userService.getUserByFromRequest(httpRequest);
            boolean success = studentInternshipService.createStudentInternship(request, user);
            String message;
            if (success) {
                message = "Created to student internship successfully: ";
                return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message, true));
            }
            message = "Could not create the student internship !";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message, false));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @Operation(summary = "Get all student internships by user")
    @GetMapping("/all")
    public ResponseEntity<List<StudentInternshipResponse>> getListFiles(HttpServletRequest request) throws IOException {
        try {
            User user = userService.getUserByFromRequest(request);

            List<StudentInternshipResponse> internships = studentInternshipService.getStudentInternshipByUser(user);

            return ResponseEntity.status(HttpStatus.OK).body(internships);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
        }

    }

    @Operation(summary = "Get all student internships")
    @GetMapping("/all/admin")
    public ResponseEntity<List<StudentInternshipResponse>> getListStudentInternship(HttpServletRequest request) {
        User user = userService.getUserByFromRequest(request);
        if (!RoleEnum.ADMIN.equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        List<StudentInternshipResponse> internships = studentInternshipService.getStudentInternshipAdmin();
        return ResponseEntity.status(HttpStatus.OK).body(internships);
    }

    @Operation(summary = "Approve/decline student internship")
    @PostMapping("/approve/{id}")
    public ResponseEntity<MessageResponse> approveOrDecline(
        HttpServletRequest request,
        @PathVariable("id") Integer id,
        @RequestParam("isApproved") Boolean isApproved
    ) {
        User user = userService.getUserByFromRequest(request);
        if (!RoleEnum.ADMIN.equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        Boolean response = studentInternshipService.approveOrDecline(id, isApproved);
        String message;
        if (response) {
            message = "Approved/declined student internship successfully";
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message, true));
        }
        message = "Could not approve/decline the student internship !";
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message, false));
    }

    @Operation(summary = "Add tutor to student internship")
    @PostMapping("/tutor/{userId}")
    public ResponseEntity<MessageResponse> addTutor(
        HttpServletRequest request,
        @PathVariable("userId") Integer userId,
        @RequestParam("isSchool") Boolean isSchool,
        @RequestParam("studentInternshipId") Integer studentInternshipId
    ) {
        User user = userService.getUserByFromRequest(request);
        if (!RoleEnum.ADMIN.equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        Boolean response = studentInternshipService.addTutor(userId, isSchool, studentInternshipId);
        String message;
        if (response) {
            message = "Update student internship successfully";
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message, true));
        }
        message = "Could not update the student internship !";
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message, false));
    }
}
