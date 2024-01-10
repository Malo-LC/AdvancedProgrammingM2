package com.advancedprogramming.api.controllers.beans;

public record FileDBResponse(
    String id,
    String name,
    String type,
    String url,
    int size
) {
}
