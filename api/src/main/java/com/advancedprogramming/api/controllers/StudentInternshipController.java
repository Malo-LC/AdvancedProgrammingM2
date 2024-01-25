package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.controllers.beans.MessageResponse;
import com.advancedprogramming.api.controllers.beans.StudentInternshipRequest;
import com.advancedprogramming.api.controllers.beans.StudentInternshipResponse;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.services.StudentInternshipService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.advancedprogramming.api.services.UserService;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping(path = "/studentInternship")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class StudentInternshipController {
    @Autowired
    private StudentInternshipService studentInternshipService;
    @Autowired
    private final UserService userService;

    @PostMapping("/create")
    @Operation(summary = "Create student internship")
    public ResponseEntity<MessageResponse> createStudentInternship(
            @Valid @RequestBody StudentInternshipRequest request) throws IOException {
        try {
            boolean success = studentInternshipService.createStudentInternship(request);
            String message;
            if (success) {
                message = "Created to student internship sucessfuly: ";
                return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message, true));
            }
            message = "Could not create the student internship !";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message, false));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @Operation(summary = "Get all submits by user")
    @GetMapping("/all")
    public ResponseEntity<List<StudentInternshipResponse>> getListFiles(HttpServletRequest request) throws IOException {
        try {
            User user = userService.getUserByFromRequest(request);

            List<StudentInternshipResponse> internships = studentInternshipService.GetStudentInternshipByUser(user);

            return ResponseEntity.status(HttpStatus.OK).body(internships);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
        }

    }
}
