package com.advancedprogramming.api.services;

import com.advancedprogramming.api.controllers.beans.StudentInternshipRequest;
import com.advancedprogramming.api.controllers.beans.StudentInternshipResponse;
import com.advancedprogramming.api.models.Internship;
import com.advancedprogramming.api.models.InternshipRepository;
import com.advancedprogramming.api.models.StudentInternship;
import com.advancedprogramming.api.models.StudentInternshipForm;
import com.advancedprogramming.api.models.StudentInternshipFormRepository;
import com.advancedprogramming.api.models.StudentInternshipRepository;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.UserRepository;
import com.advancedprogramming.api.models.bean.RoleEnum;
import com.advancedprogramming.api.services.bean.UserShort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentInternshipService {
    private final StudentInternshipRepository studentInternshipRepository;
    private final InternshipRepository internshipRepository;
    private final UserRepository userRepository;
    private final StudentInternshipFormRepository studentInternshipFormRepository;

    public Boolean createStudentInternship(StudentInternshipRequest request, User user) {
        Optional<Internship> optionalInternship = internshipRepository.findById(request.internship_id());

        if (optionalInternship.isPresent()) {
            StudentInternship studentInternship = StudentInternship
                .builder()
                .isApproved(null)
                .companyName(request.companyName())
                .companyAddress(request.companyAddress())
                .companyPostalCode(request.companyPostalCode())
                .companyCity(request.companyCity())
                .companyCountry(request.companyCountry())
                .mission(request.mission())
                .tutorSchoolFirstName(request.tutorSchoolFirstName())
                .tutorSchoolLastName(request.tutorSchoolLastName())
                .tutorSchoolEmail(request.tutorSchoolEmail())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .wage(request.wage())
                .user(user)
                .internship(optionalInternship.get())
                .build();
            studentInternshipRepository.save(studentInternship);
            return true;
        }
        return false;
    }

    public List<StudentInternshipResponse> getStudentInternshipByUser(User user) {
        if (RoleEnum.TUTOR.equals(user.getRole())) {
            return getStudentInternshipTutor(user);
        } else if (RoleEnum.STUDENT.equals(user.getRole())) {
            return getStudentInternshipStudent(user);
        }
        return List.of();
    }

    public List<StudentInternshipResponse> getStudentInternshipAdmin() {
        List<StudentInternship> studentInternships = studentInternshipRepository.findAll();
        return getStudentInternshipResponses(studentInternships);
    }

    private List<StudentInternshipResponse> getStudentInternshipTutor(User tutor) {
        List<StudentInternship> studentInternships = studentInternshipRepository.findAllByTutorId(tutor.getId());
        return getStudentInternshipResponses(studentInternships);
    }

    private List<StudentInternshipResponse> getStudentInternshipStudent(User student) {
        List<StudentInternship> studentInternships = studentInternshipRepository.findAllByUserId(student.getId());
        return getStudentInternshipResponses(studentInternships);
    }

    private List<StudentInternshipResponse> getStudentInternshipResponses(List<StudentInternship> studentInternships) {
        List<StudentInternshipResponse> studentInternshipResponses = new ArrayList<>();
        Map<Integer, StudentInternshipForm> formsByStudentInternshipId = studentInternshipFormRepository.findAll()
            .stream()
            .collect(
                Collectors.toMap(
                    form -> form.getStudentInternship().getId(),
                    form -> form
                )
            );

        for (StudentInternship studentInternship : studentInternships) {
            UserShort student = new UserShort(
                studentInternship.getUser().getId(),
                studentInternship.getUser().getFirstName(),
                studentInternship.getUser().getLastName()
            );

            UserShort tutorCompany = studentInternship.getTutorCompanyUser() == null ? null : new UserShort(
                studentInternship.getTutorCompanyUser().getId(),
                studentInternship.getTutorCompanyUser().getFirstName(),
                studentInternship.getTutorCompanyUser().getLastName()
            );

            UserShort tutorSchool = studentInternship.getTutorSchoolUser() == null ? null : new UserShort(
                studentInternship.getTutorSchoolUser().getId(),
                studentInternship.getTutorSchoolUser().getFirstName(),
                studentInternship.getTutorSchoolUser().getLastName()
            );

            studentInternshipResponses.add(new StudentInternshipResponse(
                studentInternship.getId(),
                studentInternship.getIsApproved(),
                studentInternship.getCompanyName(),
                studentInternship.getCompanyAddress(),
                studentInternship.getCompanyPostalCode(),
                studentInternship.getCompanyCity(),
                studentInternship.getCompanyCountry(),
                studentInternship.getMission(),
                studentInternship.getStartDate(),
                studentInternship.getEndDate(),
                studentInternship.getWage(),
                student,
                tutorSchool,
                tutorCompany,
                studentInternship.getInternship().getPromotion(),
                formsByStudentInternshipId.get(studentInternship.getId())
            ));
        }

        return studentInternshipResponses;
    }

    public Boolean approveOrDecline(Integer id, Boolean isApproved) {
        Optional<StudentInternship> optionalStudentInternship = studentInternshipRepository.findById(id);
        if (optionalStudentInternship.isPresent()) {
            StudentInternship studentInternship = optionalStudentInternship.get();
            studentInternship.setIsApproved(isApproved);
            studentInternshipRepository.save(studentInternship);
            return true;
        }
        return false;
    }

    public Boolean addTutor(Integer userId, Boolean isSchool, Integer studentInternshipId) {
        Optional<StudentInternship> optionalStudentInternship = studentInternshipRepository.findById(studentInternshipId);
        if (optionalStudentInternship.isPresent()) {
            StudentInternship studentInternship = optionalStudentInternship.get();
            User tutor = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            if (isSchool) {
                studentInternship.setTutorSchoolUser(tutor);
            } else {
                studentInternship.setTutorCompanyUser(tutor);
            }
            studentInternshipRepository.save(studentInternship);
            return true;
        }
        return false;
    }
}
