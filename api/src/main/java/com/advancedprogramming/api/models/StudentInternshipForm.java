package com.advancedprogramming.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Table(name = "student_internship_form")
public class StudentInternshipForm {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Boolean isCompleted = false;
    private Boolean isSignedByStudent = false;
    private Boolean isSignedByTutorSchool = false;
    private Boolean isSignedByTutorCompany = false;

    @ManyToOne
    private Form form;

    @ManyToOne
    @JsonIgnore
    private StudentInternship studentInternship;

    @OneToMany(mappedBy = "studentInternshipForm")
    private List<Answer> answers;
}
