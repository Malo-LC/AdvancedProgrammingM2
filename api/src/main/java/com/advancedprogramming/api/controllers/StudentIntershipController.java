package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.controllers.beans.MessageResponse;
import com.advancedprogramming.api.controllers.beans.StudentInternshipRequest;
import com.advancedprogramming.api.services.StudentInternshipService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;

@Controller
@RequestMapping(path = "/studentInternship")
@CrossOrigin(origins = "*")
public class StudentIntershipController {
    @Autowired
    private StudentInternshipService studentInternshipService;


    @PostMapping("/create")
    @Operation(summary = "Create student internship")
    public ResponseEntity<MessageResponse> createStudentInternship(
            @Valid @RequestBody StudentInternshipRequest request
    ) throws IOException {
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
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(e.getMessage(), false));
        }
    }
}
