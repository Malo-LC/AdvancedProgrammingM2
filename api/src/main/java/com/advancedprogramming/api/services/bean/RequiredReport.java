package com.advancedprogramming.api.services.bean;

import java.time.LocalDate;

public record RequiredReport(
    Integer id,
    String title,
    String description,
    LocalDate deadline
) {
}
