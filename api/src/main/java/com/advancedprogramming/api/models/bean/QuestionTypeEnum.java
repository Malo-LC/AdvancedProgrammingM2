package com.advancedprogramming.api.models.bean;

public enum QuestionTypeEnum {
    TEXT("TEXT"),
    QCM("QCM");

    private String name;

    QuestionTypeEnum(String name) {
        this.name = name;
    }
}
