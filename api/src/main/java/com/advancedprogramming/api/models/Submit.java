package com.advancedprogramming.api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
public class Submit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private LocalDate submitDate = LocalDate.now();
    private Boolean isApprovedBySchool = false;
    private Boolean isApprovedByCompany = false;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setSubmitDate(LocalDate submitDate) {
        this.submitDate = submitDate;
    }

    public void setIsApprovedBySchool(Boolean isApprovedBySchool) {
        this.isApprovedBySchool = isApprovedBySchool;
    }

    public void setIsApprovedByCompany(Boolean isApprovedByCompany) {
        this.isApprovedByCompany = isApprovedByCompany;
    }

    @ManyToOne
    @JoinColumn(name = "report_id")
    private Report report;

    @ManyToOne
    @JoinColumn(name = "student_internship_id")
    private StudentInternship studentInternship;

    @ManyToOne
    @JoinColumn(name = "filedb_id")
    private Filedb filedb;
}
