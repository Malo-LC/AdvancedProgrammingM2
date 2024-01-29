package com.advancedprogramming.api.services.bean;

import java.time.LocalDate;
import java.util.List;

public record InternshipSettings(
    Integer internshipId,
    Integer promotionYear,
    String title,
    Boolean isClosed,
    LocalDate endDate,
    List<RequiredReport> requiredReports
) {
}
