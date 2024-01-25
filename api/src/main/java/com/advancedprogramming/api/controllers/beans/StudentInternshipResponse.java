package com.advancedprogramming.api.controllers.beans;

import java.time.LocalDate;

public record StudentInternshipResponse (
    Boolean isInternshipValidated,
    String companyName,
    String companyAddress,
    String companyPostalCode,
    String companyCity,
    String companyCountry,
    String mission,
    LocalDate startDate,
    LocalDate endDate,
    Integer wage,
    String studentFirstname,
    String studentLastname,
    String tutorSchoolFirstname,
    String tutorSchoolLastname,
    String tutorCompanyFirstname,
    String tutorCompanyLastname   
) {
}