package com.advancedprogramming.api.controllers.beans;

import java.time.LocalDate;

public record RegisterRequest(
    String firstName,
    String lastName,
    String email,
    LocalDate birthDate,
    Integer promotionYear,
    String password
) {
}
