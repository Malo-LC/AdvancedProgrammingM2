package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.models.Internship;
import com.advancedprogramming.api.services.InternshipService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/internship")
@CrossOrigin(origins = "*")
@Tag(name = "Internships")
@RequiredArgsConstructor
public class InternshipsController {
    private final InternshipService internshipService;

    @GetMapping
    public List<Internship> getInternships() {
        return internshipService.getAllInternships();
    }

}
