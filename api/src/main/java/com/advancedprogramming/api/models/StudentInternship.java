package com.advancedprogramming.api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class StudentInternship {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Boolean isApproved;
    private String companyName;
    private String companyAddress;
    private String companyPostalCode;
    private String companyCity;
    private String companyCountry;
    private String mission;
    private String tutorSchoolFirstName;
    private String tutorSchoolLastName;
    private String tutorSchoolEmail;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer wage;

    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setCompanyAddress(String companyAddress) {
        this.companyAddress = companyAddress;
    }

    public void setCompanyPostalCode(String companyPostalCode) {
        this.companyPostalCode = companyPostalCode;
    }

    public void setCompanyCity(String companyCity) {
        this.companyCity = companyCity;
    }

    public void setCompanyCountry(String companyCountry) {
        this.companyCountry = companyCountry;
    }

    public void setMission(String mission) {
        this.mission = mission;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "tutor_school_user_id")
    private User tutorSchoolUser;

    @ManyToOne
    @JoinColumn(name = "tutor_company_user_id")
    private User tutorCompanyUser;

    @ManyToOne
    @JoinColumn(name = "internship_id")
    private Internship internship;

    @OneToMany(mappedBy = "studentInternship")
    private List<Submit> submits;
}
