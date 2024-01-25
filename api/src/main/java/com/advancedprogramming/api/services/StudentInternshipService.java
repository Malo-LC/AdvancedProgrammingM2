package com.advancedprogramming.api.services;

import com.advancedprogramming.api.controllers.beans.StudentInternshipRequest;
import com.advancedprogramming.api.controllers.beans.StudentInternshipResponse;
import com.advancedprogramming.api.controllers.beans.SubmitResponse;
import com.advancedprogramming.api.models.Internship;
import com.advancedprogramming.api.models.InternshipRepository;
import com.advancedprogramming.api.models.StudentInternship;
import com.advancedprogramming.api.models.StudentInternshipRepository;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.UserRepository;
import com.advancedprogramming.api.models.bean.RoleEnum;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentInternshipService {
    private final StudentInternshipRepository studentInternshipRepository;
    private final InternshipRepository internshipRepository;
    private final UserRepository userRepository;

    public Boolean createStudentInternship(StudentInternshipRequest request) {
        Optional<User> optionalUser = userRepository.findById(request.user_id());
        Optional<Internship> optionalStudentInternship = internshipRepository.findById(request.internship_id());

        if (optionalUser.isPresent() && optionalStudentInternship.isPresent()) {
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
                .user(optionalUser.get())
                .internship(optionalStudentInternship.get())
                .build();
            studentInternshipRepository.save(studentInternship);
            return true;
        }
        return false;
    }

    public List<StudentInternshipResponse> GetStudentInternshipByUser(User user) {
        if (RoleEnum.TUTOR.equals(user.getRole())) {
            return GetStudentInternshipTutor(user);
        } else if (RoleEnum.STUDENT.equals(user.getRole())) {
            return GetStudentInternshipStudent(user);
        }
        return List.of();
    }

    private List<StudentInternshipResponse> GetStudentInternshipTutor(User Tutor) {
        return List.of();
    }

    private List<StudentInternshipResponse> GetStudentInternshipStudent(User student) {
        List<StudentInternship> studentInternships = studentInternshipRepository.findAllByUserId(student.getId());
        List<StudentInternshipResponse> studentInternshipResponses = new ArrayList<>();

        for (StudentInternship studentInternship : studentInternships) {
            String tutorSchoolFirstname;
            String tutorSchoolLastname;
            String tutorCompanyFirstname;
            String tutorCompanyLastname;

            if(studentInternship.getTutorSchoolUser() == null) {
                tutorSchoolFirstname = "";
                tutorSchoolLastname = "";
            } else {
                tutorSchoolFirstname = studentInternship.getTutorSchoolUser().getFirstName();
                tutorSchoolLastname = studentInternship.getTutorSchoolUser().getLastName();
            }

            if (studentInternship.getTutorCompanyUser() == null) {
                tutorCompanyFirstname = "";
                tutorCompanyLastname = "";
            } else {
                tutorCompanyFirstname = studentInternship.getTutorCompanyUser().getFirstName();
                tutorCompanyLastname = studentInternship.getTutorCompanyUser().getLastName();
            }

            studentInternshipResponses.add(new StudentInternshipResponse(
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
                studentInternship.getUser().getFirstName(),
                studentInternship.getUser().getLastName(),
                tutorSchoolFirstname,
                tutorSchoolLastname,
                tutorCompanyFirstname,
                tutorCompanyLastname
            ));
        }

        return studentInternshipResponses;
    }
}
