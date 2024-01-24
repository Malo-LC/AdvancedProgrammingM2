package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.controllers.beans.AuthenticationResponse;
import com.advancedprogramming.api.controllers.beans.MessageResponse;
import com.advancedprogramming.api.controllers.beans.RegisterRequest;
import com.advancedprogramming.api.controllers.beans.StudentInternshipRequest;
import com.advancedprogramming.api.models.Filedb;
import com.advancedprogramming.api.models.StudentInternship;
import com.advancedprogramming.api.models.StudentInternshipRepository;
import com.advancedprogramming.api.services.StudentInternshipService;
import org.springframework.http.HttpHeaders;
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
    private StudentInternshipService studentInternshipService;


    @PostMapping
    public ResponseEntity<Boolean> register(
            @RequestBody StudentInternshipRequest request
    ) throws IOException {
        return ResponseEntity.ok(studentInternshipService.createStudentInternship(request));
        /*try {
            boolean success = studentInternshipService.createStudentInternship(request);
            String message;
            if (success) {
                message = "Created to student internship sucessfuly: ";
                return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message, true));
            }
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message, false));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(e.getMessage(), false));
        }*/
    }
}
