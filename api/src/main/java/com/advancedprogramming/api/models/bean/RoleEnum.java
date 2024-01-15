package com.advancedprogramming.api.models.bean;

public enum RoleEnum {
    STUDENT("STUDENT"),
    TUTOR("TUTOR"),
    ADMIN("ADMIN");

    private String name;

    RoleEnum(String name) {
        this.name = name;
    }
}
