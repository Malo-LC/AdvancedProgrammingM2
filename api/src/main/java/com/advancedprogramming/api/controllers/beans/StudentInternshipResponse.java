package com.advancedprogramming.api.controllers.beans;

import com.advancedprogramming.api.models.Promotion;
import com.advancedprogramming.api.models.StudentInternshipForm;
import com.advancedprogramming.api.services.bean.UserShort;

import java.time.LocalDate;

public record StudentInternshipResponse(
    Integer id,
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
    UserShort student,
    UserShort tutorSchool,
    UserShort tutorCompany,
    Promotion promotion,
    StudentInternshipForm form
) {
}