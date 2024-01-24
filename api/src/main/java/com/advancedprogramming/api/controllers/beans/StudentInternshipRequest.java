package com.advancedprogramming.api.controllers.beans;

import java.time.LocalDate;

public record StudentInternshipRequest(
        Integer id,
        Boolean isApproved,
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
        Integer wage
) {
}
