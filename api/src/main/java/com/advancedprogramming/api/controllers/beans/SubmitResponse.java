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
    SubmitTutor tutorSchool,
    SubmitTutor tutorInternship,
    Boolean isSubmitted
) {
}
