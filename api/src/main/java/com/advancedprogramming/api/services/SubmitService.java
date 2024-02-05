package com.advancedprogramming.api.services;

import com.advancedprogramming.api.controllers.beans.SubmitFileBody;
import com.advancedprogramming.api.controllers.beans.SubmitResponse;
import com.advancedprogramming.api.controllers.beans.SubmitTutor;
import com.advancedprogramming.api.models.Filedb;
import com.advancedprogramming.api.models.Internship;
import com.advancedprogramming.api.models.Report;
import com.advancedprogramming.api.models.ReportRepository;
import com.advancedprogramming.api.models.StudentInternship;
import com.advancedprogramming.api.models.StudentInternshipRepository;
import com.advancedprogramming.api.models.Submit;
import com.advancedprogramming.api.models.SubmitRepository;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.bean.RoleEnum;
import com.advancedprogramming.api.models.bean.YearEnum;
import com.advancedprogramming.api.services.bean.UserShort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubmitService {
    private final StudentInternshipRepository studentInternshipRepository;
    private final UserService userService;
    private final ReportRepository reportRepository;
    private final FileStorageService fileStorageService;
    private final SubmitRepository submitRepository;

    public List<SubmitResponse> getSubmitsByUser(User user) {
        if (RoleEnum.TUTOR.equals(user.getRole())) {
            return getSubmitTutor(user);
        } else if (RoleEnum.STUDENT.equals(user.getRole())) {
            return getSubmitStudent(user);
        }
        return List.of();
    }

    private List<SubmitResponse> getSubmitTutor(User tutor) {
        List<User> students = findStudentIdsOfTutor(tutor);
        List<SubmitResponse> submits = new ArrayList<>();
        for (User student : students) {
            submits.addAll(getSubmitStudent(student));
        }
        return submits;
    }

    private List<User> findStudentIdsOfTutor(User tutor) {
        return studentInternshipRepository.findAllByTutorId(tutor.getId())
            .stream()
            .map(StudentInternship::getUser)
            .toList();
    }

    private List<SubmitResponse> getSubmitStudent(User user) {
        Optional<StudentInternship> studentInternships = studentInternshipRepository.findAllByUserId(user.getId())
            .stream()
            .min((o1, o2) -> o2.getStartDate().compareTo(o1.getStartDate()));

        if (studentInternships.isPresent()) {
            StudentInternship studentInternship = studentInternships.get();
            Internship internship = studentInternship.getInternship();
            Map<Integer, Submit> submitsByReportId = studentInternship.getSubmits()
                .stream()
                .collect(Collectors.toMap(o -> o.getReport().getId(), submit -> submit));
            List<Report> reports = internship.getReports();
            Map<Integer, User> getUserById = userService.getUserById();
            User tutorSchool = getUserById.get(studentInternship.getTutorSchoolUser().getId());
            User tutorCompany = getUserById.get(studentInternship.getTutorCompanyUser().getId());
            YearEnum promotionClass = internship.getPromotion().getPromotionClass();

            return reports
                .stream()
                .map(report -> {
                    Submit submit = submitsByReportId.getOrDefault(report.getId(), null);

                    SubmitTutor tutorSchoolSubmit = new SubmitTutor(
                        tutorSchool.getId(),
                        submit != null ? submit.getIsApprovedBySchool() : null,
                        tutorSchool.getFirstName(),
                        tutorSchool.getLastName()
                    );

                    SubmitTutor tutorCompanySubmit = new SubmitTutor(
                        tutorCompany.getId(),
                        submit != null ? submit.getIsApprovedByCompany() : null,
                        tutorCompany.getFirstName(),
                        tutorCompany.getLastName()
                    );

                    UserShort userShort = new UserShort(
                        user.getId(),
                        user.getFirstName(),
                        user.getLastName()
                    );

                    return new SubmitResponse(
                        submit != null ? submit.getId() : null,
                        userShort,
                        report.getId(),
                        promotionClass,
                        internship.getTitle(),
                        report.getTitle(),
                        report.getDeadline(),
                        tutorSchoolSubmit,
                        tutorCompanySubmit,
                        submit != null,
                        studentInternship.getId(),
                        studentInternship.getCompanyName()
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

            Map<Integer, Submit> submitsByReportId = studentInternship.getSubmits()
                .stream()
                .collect(Collectors.toMap(o -> o.getReport().getId(), submit -> submit));

            Submit submit = submitsByReportId.getOrDefault(body.reportId(), null);

            if (submit == null) {
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
            // Submit found, update it only if it is not approved
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

    public String downloadSubmit(Integer submitId, User user) {
        Optional<Submit> optionalSubmit = submitRepository.findById(submitId);
        if (optionalSubmit.isPresent()) {
            Submit submit = optionalSubmit.get();
            Integer userId = submit.getStudentInternship().getUser().getId();
            List<Integer> tutorsIds = List.of(
                submit.getStudentInternship().getTutorCompanyUser().getId(),
                submit.getStudentInternship().getTutorSchoolUser().getId()
            );
            if (Objects.equals(userId, user.getId()) || tutorsIds.contains(user.getId())) {
                Filedb filedb = submit.getFiledb();
                return new String(filedb.getData());
            } else {
                log.warn("User {} is not allowed to download submit {}", user.getId(), submitId);
                return null;
            }
        } else {
            log.warn("Submit not found with id {}", submitId);
            return null;
        }
    }

    public List<SubmitResponse> getSubmitToValidate(User tutor) {
        List<User> students = findStudentIdsOfTutor(tutor);
        List<SubmitResponse> submits = new ArrayList<>();
        for (User student : students) {
            submits.addAll(getSubmitStudent(student));
        }
        return submits
            .stream()
            .filter(submitResponse -> submitResponse.tutorSchool().userId().equals(tutor.getId()) ? submitResponse.tutorSchool().isValidated() == null : submitResponse.tutorInternship().isValidated() == null)
            .toList();
    }
}
