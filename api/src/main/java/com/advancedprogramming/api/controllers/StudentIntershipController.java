package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.models.Filedb;
import com.advancedprogramming.api.services.StudentInternshipService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/studentInternship")
@CrossOrigin(origins = "*")
public class StudentIntershipController(
        @RequestParam
        Integer id,
        @RequestParam
) {
    private StudentInternshipService studentInternshipService;

    @PostMapping
    public ResponseEntity<String> getStudentInternships(@PathVariable String year) {
        Filedb fileDB = studentInternshipService;

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
                .body(base64);
    }
}
