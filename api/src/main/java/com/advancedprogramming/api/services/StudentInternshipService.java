package com.advancedprogramming.api.services;

import com.advancedprogramming.api.controllers.beans.StudentInternshipRequest;
import com.advancedprogramming.api.models.Internship;
import com.advancedprogramming.api.models.InternshipRepository;
import com.advancedprogramming.api.models.StudentInternship;
import com.advancedprogramming.api.models.StudentInternshipRepository;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
