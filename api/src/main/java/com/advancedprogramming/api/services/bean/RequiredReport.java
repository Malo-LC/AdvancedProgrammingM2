package com.advancedprogramming.api.services.bean;

import java.time.LocalDate;

public record RequiredReport(
    Integer id,
    String name,
    String description,
    LocalDate deadline
) {
}
