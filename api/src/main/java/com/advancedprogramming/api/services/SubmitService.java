package com.advancedprogramming.api.services;

import com.advancedprogramming.api.controllers.beans.SubmitFileBody;
import com.advancedprogramming.api.controllers.beans.SubmitResponse;
import com.advancedprogramming.api.models.Filedb;
import com.advancedprogramming.api.models.Internship;
import com.advancedprogramming.api.models.Report;
import com.advancedprogramming.api.models.ReportRepository;
import com.advancedprogramming.api.models.StudentInternship;
import com.advancedprogramming.api.models.StudentInternshipRepository;
import com.advancedprogramming.api.models.Submit;
import com.advancedprogramming.api.models.SubmitRepository;
import com.advancedprogramming.api.models.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubmitService {
    private final StudentInternshipRepository studentInternshipRepository;
    private final UserService userService;
    private final ReportRepository reportRepository;
    private final FileStorageService fileStorageService;
    private final SubmitRepository submitRepository;

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
                        internship.getPromotionYear(),
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

    public boolean uploadSubmit(String token, Integer studentInternshipId, SubmitFileBody body) throws IOException {
        User user = userService.getUserByToken(token);

        Optional<StudentInternship> optionalStudentInternship = studentInternshipRepository.findById(studentInternshipId);

        if (optionalStudentInternship.isPresent()) {
            StudentInternship studentInternship = optionalStudentInternship.get();
            if (!Objects.equals(studentInternship.getUser().getId(), user.getId())) {
                log.warn("User {} is not allowed to upload a submit for student internship {}", user.getId(), studentInternshipId);
                return false;
            }

            List<Submit> submits = studentInternship.getSubmits();

            Optional<Submit> optionalSubmit = submits
                .stream()
                .filter(s -> s.getReport().getId().equals(body.reportId()))
                .findFirst();

            if (optionalSubmit.isEmpty()) {
                // No submit found, create a new one
                MultipartFile file = Base64ToMultipartFileConverter.convert(
                    body.file().base64(),
                    body.file().type(),
                    body.file().name()
                );
                Filedb filedb = fileStorageService.store(file);
                Report report = reportRepository.findById(body.reportId()).orElseThrow();
                Submit newSubmit = new Submit();
                newSubmit.setReport(report);
                newSubmit.setStudentInternship(studentInternship);
                newSubmit.setFiledb(filedb);
                submitRepository.save(newSubmit);
                return true;
            }
            log.warn("Submit already exists for student internship {}", studentInternshipId);
            // Submit found, cannot create a new one
            // TODO: maybe update the file?
            Submit submit = optionalSubmit.get();
            if (Boolean.FALSE.equals(submit.getIsApprovedByCompany()) || Boolean.FALSE.equals(submit.getIsApprovedBySchool())) {
                MultipartFile file = Base64ToMultipartFileConverter.convert(
                    body.file().base64(),
                    body.file().type(),
                    body.file().name()
                );
                Filedb filedb = fileStorageService.store(file);
                submit.setFiledb(filedb);
                submitRepository.save(submit);
                return true;
            } else {
                log.warn("Submit already approved or pending for student internship {}", studentInternshipId);
                // Submit already approved
                return false;
            }
        }
        log.warn("Student internship not found with id {}", studentInternshipId);
        // No student internship found
        return false;
    }

    public Boolean acceptOrDeclineSubmit(Integer submitId, Boolean isAccepted, User user) {
        Optional<Submit> optionalSubmit = submitRepository.findById(submitId);
        if (optionalSubmit.isPresent()) {
            Submit submit = optionalSubmit.get();
            if (Objects.equals(submit.getStudentInternship().getTutorCompanyUser().getId(), user.getId())) {
                submit.setIsApprovedByCompany(isAccepted);
            } else if (Objects.equals(submit.getStudentInternship().getTutorSchoolUser().getId(), user.getId())) {
                submit.setIsApprovedBySchool(isAccepted);
            } else {
                log.warn("User {} is not allowed to accept or decline submit {}", user.getId(), submitId);
                return false;
            }
            submitRepository.save(submit);
            return true;
        } else {
            log.warn("Submit not found with id {}", submitId);
            return false;
        }
    }
}
