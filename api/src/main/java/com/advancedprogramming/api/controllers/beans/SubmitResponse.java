package com.advancedprogramming.api.controllers.beans;

import com.advancedprogramming.api.models.bean.YearEnum;
import com.advancedprogramming.api.services.bean.UserShort;

import java.time.LocalDate;

public record SubmitResponse(
    Integer submitId,
    UserShort userId,
    Integer reportId,
    YearEnum internshipName,
    String reportName,
    LocalDate deadline,
    SubmitTutor tutorSchool,
    SubmitTutor tutorInternship,
    Boolean isSubmitted
) {
}
