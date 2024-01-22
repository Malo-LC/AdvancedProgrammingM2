package com.advancedprogramming.api.services;

import com.advancedprogramming.api.models.Internship;
import com.advancedprogramming.api.models.InternshipRepository;
import com.advancedprogramming.api.services.bean.InternshipSettings;
import com.advancedprogramming.api.services.bean.RequiredReport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class InternshipSettingsService {
    private final InternshipRepository internshipRepository;

    public InternshipSettings getInternshipSettings(Integer internshipId) {
        Optional<Internship> internshipOptional = internshipRepository.findById(internshipId);
        if (internshipOptional.isEmpty()) {
            return null;
        }
        Internship internship = internshipOptional.get();
        List<RequiredReport> requiredReports = internship
            .getReports()
            .stream()
            .map(report -> new RequiredReport(
                report.getId(),
                report.getTitle(),
                report.getDescription(),
                report.getDeadline()
            ))
            .toList();

        return new InternshipSettings(
            internship.getId(),
            internship.getPromotionYear(),
            internship.getTitle(),
            internship.getIsClosed(),
            internship.getEndDate(),
            requiredReports
        );
    }
}
