package com.advancedprogramming.api.controllers.beans;

public record SubmitTutor(
    Integer userId,
    Boolean isValidated,
    String firstName,
    String lastName
) {
}
