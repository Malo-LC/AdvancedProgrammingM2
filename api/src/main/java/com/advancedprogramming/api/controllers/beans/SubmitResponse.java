package com.advancedprogramming.api.controllers.beans;

import com.advancedprogramming.api.models.bean.YearEnum;

import java.time.LocalDate;

public record SubmitResponse(
    Integer submitId,
    Integer userId,
    Integer reportId,
    YearEnum internshipName,
    String reportName,
    LocalDate deadline,
    Boolean isValidatedByTutorSchool,
    Boolean isValidatedByTutorInternship,
    Boolean isSubmitted
) {
}
