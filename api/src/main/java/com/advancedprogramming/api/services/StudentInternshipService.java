package com.advancedprogramming.api.services;

import com.advancedprogramming.api.controllers.beans.StudentInternshipRequest;
import com.advancedprogramming.api.models.*;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Service
public class StudentInternshipService {
    @Autowired
    private StudentInternshipRepository studentInternshipRepository;
    @Autowired
    private InternshipRepository internshipRepository;
    @Autowired
    private UserRepository userRepository;

    public Boolean createStudentInternship(StudentInternshipRequest request) {
        if(userRepository.findById(request.user_id()).isPresent() && internshipRepository.findById(request.internship_id()).isPresent()){
            StudentInternship studentInternship = StudentInternship.builder()
                    .id(request.id())
                    .isApproved(request.isApproved())
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
                    .user(userRepository.findById(request.user_id()).get())
                    .internship(internshipRepository.findById(request.internship_id()).get())
                    .build();
            studentInternshipRepository.save(studentInternship);
            return true;
        }
        return false;
    }
}
