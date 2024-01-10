package com.advancedprogramming.api.controllers.beans;

public record MessageResponse(
    String message,
    Boolean ok
) {
}
