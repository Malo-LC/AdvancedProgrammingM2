package com.advancedprogramming.api.controllers.beans;

public record SubmitFileBody(
    CustomFile file,
    Integer reportId
) {
}
