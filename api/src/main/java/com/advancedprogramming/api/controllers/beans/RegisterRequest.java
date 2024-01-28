package com.advancedprogramming.api.controllers.beans;

public record RegisterRequest(
    String firstName,
    String lastName,
    String email,
    String phoneNumber,
    Integer promotionYear,
    String password,
    CustomFile profilePicture
) {
}
