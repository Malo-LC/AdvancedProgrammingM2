package com.advancedprogramming.api.services.bean;

import com.advancedprogramming.api.models.bean.QuestionTypeEnum;

public record QuestionRequest(
    Integer id,
    String title,
    QuestionTypeEnum type
) {
}
