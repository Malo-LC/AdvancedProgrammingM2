package com.advancedprogramming.api.services;

import com.advancedprogramming.api.controllers.beans.SubmitResponse;
import com.advancedprogramming.api.models.Internship;
import com.advancedprogramming.api.models.Report;
import com.advancedprogramming.api.models.StudentInternship;
import com.advancedprogramming.api.models.StudentInternshipRepository;
import com.advancedprogramming.api.models.Submit;
import com.advancedprogramming.api.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubmitService {
    private final StudentInternshipRepository studentInternshipRepository;
    private final UserService userService;

    public List<SubmitResponse> getSubmitsByUser(String token) {
        User user = userService.getUserByToken(token);

        Optional<StudentInternship> studentInternships = studentInternshipRepository.findAllByUserId(user.getId())
            .stream()
            .min((o1, o2) -> o2.getStartDate().compareTo(o1.getStartDate()));

        if (studentInternships.isPresent()) {
            StudentInternship studentInternship = studentInternships.get();
            Internship internship = studentInternship.getInternship();
            List<Submit> submits = studentInternship.getSubmits();
            List<Report> reports = internship.getReports();

            return reports
                .stream()
                .map(report -> {
                    Submit submit = submits
                        .stream()
                        .filter(s -> s.getReport().getId().equals(report.getId()))
                        .findFirst()
                        .orElse(null);

                    return new SubmitResponse(
                        submit != null ? submit.getId() : null,
                        user.getId(),
                        report.getId(),
                        internship.getYear(),
                        report.getTitle(),
                        report.getDeadline(),
                        submit != null ? submit.getIsApprovedBySchool() : null,
                        submit != null ? submit.getIsApprovedByCompany() : null,
                        submit != null
                    );
                })
                .toList();
        } else {
            // No student internship found
            return List.of();
        }
    }
}
