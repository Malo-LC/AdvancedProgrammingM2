package com.advancedprogramming.api.services.bean;

import java.time.LocalDate;
import java.util.List;

public record FormRequest(
    Integer id,
    String title,
    LocalDate deadline,
    List<QuestionRequest> questions
) {
}
