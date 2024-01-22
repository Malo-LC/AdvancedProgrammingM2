package com.advancedprogramming.api.services.bean;

import com.advancedprogramming.api.models.bean.YearEnum;

import java.time.LocalDate;
import java.util.List;

public record InternshipSettings(
    Integer internshipId,
    YearEnum promotionYear,
    String title,
    Boolean isClosed,
    LocalDate endDate,
    List<RequiredReport> requiredReports
) {
}
