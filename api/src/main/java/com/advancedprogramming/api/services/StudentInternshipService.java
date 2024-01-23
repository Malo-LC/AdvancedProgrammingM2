package com.advancedprogramming.api.services;

import com.advancedprogramming.api.models.FileDBRepository;
import com.advancedprogramming.api.models.Filedb;
import com.advancedprogramming.api.models.StudentInternship;
import com.advancedprogramming.api.models.StudentInternshipRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StudentInternshipService {
    @Autowired
    private StudentInternshipRepository studentInternshipRepository;
    public List<StudentInternship> getAllInterships(Integer userId) {
        return studentInternshipRepository.findAllByUserId(userId);
    }
}
