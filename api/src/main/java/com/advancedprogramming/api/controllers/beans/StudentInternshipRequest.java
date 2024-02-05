package com.advancedprogramming.api.controllers.beans;

import java.time.LocalDate;

public record StudentInternshipRequest(
    String companyName,
    String companyAddress,
    String companyPostalCode,
    String companyCity,
    String companyCountry,
    String mission,
    String tutorSchoolFirstName,
    String tutorSchoolLastName,
    String tutorSchoolEmail,
    LocalDate startDate,
    LocalDate endDate,
    Integer wage,
    Integer internship_id
) {
}
