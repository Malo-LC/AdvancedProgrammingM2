package com.advancedprogramming.api.services;

import com.advancedprogramming.api.models.Internship;
import com.advancedprogramming.api.models.InternshipRepository;
import com.advancedprogramming.api.models.Report;
import com.advancedprogramming.api.models.ReportRepository;
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
    private final ReportRepository reportRepository;

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
            .sorted((o1, o2) -> {
                if (o1.deadline() == null || o2.deadline() == null)
                    return 0;
                return o1.deadline().compareTo(o2.deadline());
            })
            .toList();

        return new InternshipSettings(
            internship.getId(),
            internship.getPromotion().getPromotionYear(),
            internship.getTitle(),
            internship.getIsClosed(),
            internship.getEndDate(),
            requiredReports
        );
    }

    public Boolean updateInternshipSettings(InternshipSettings internshipSettings) {
        Optional<Internship> internshipOptional = internshipRepository.findById(internshipSettings.internshipId());
        if (internshipOptional.isEmpty()) {
            return false;
        }
        Internship internship = internshipOptional.get();
        internship.setTitle(internshipSettings.title());
        internship.setIsClosed(internshipSettings.isClosed());
        internship.setEndDate(internshipSettings.endDate());
        internshipRepository.save(internship);
        List<RequiredReport> requiredReports = internshipSettings.requiredReports();
        List<Report> internshipReports = internship.getReports();
        requiredReports.forEach(requiredReport -> {
            Optional<Report> reportOptional = internshipReports
                .stream()
                .filter(report -> report.getId().equals(requiredReport.id()))
                .findFirst();
            if (reportOptional.isEmpty()) {
                // no report found, create a new one
                Report report = new Report();
                report.setTitle(requiredReport.title());
                report.setDescription(requiredReport.description());
                report.setDeadline(requiredReport.deadline());
                report.setInternship(internship);
                reportRepository.save(report);
                return;
            }
            // report found, update it
            Report report = reportOptional.get();
            report.setTitle(requiredReport.title());
            report.setDescription(requiredReport.description());
            report.setDeadline(requiredReport.deadline());
            reportRepository.save(report);
        });
        
        // delete reports that are not in the new list
        internshipReports.forEach(report -> {
            Optional<RequiredReport> requiredReportOptional = requiredReports
                .stream()
                .filter(requiredReport -> requiredReport.id().equals(report.getId()))
                .findFirst();
            if (requiredReportOptional.isEmpty()) {
                reportRepository.delete(report);
            }
        });
        return true;
    }

    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }
}
