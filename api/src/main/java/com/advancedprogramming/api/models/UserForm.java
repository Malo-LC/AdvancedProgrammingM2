package com.advancedprogramming.api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Table(name = "user_form")
public class UserForm {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Boolean isCompleted;
    private Boolean isSignedByStudent;
    private Boolean isSignedByTutorSchool;
    private Boolean isSignedByTutorCompany;

    @ManyToOne
    private Form form;

    @ManyToOne
    private StudentInternship studentInternship;
}
