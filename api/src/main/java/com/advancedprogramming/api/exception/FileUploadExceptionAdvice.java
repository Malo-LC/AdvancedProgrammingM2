package com.advancedprogramming.api.exception;

import com.advancedprogramming.api.controllers.beans.MessageResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class FileUploadExceptionAdvice extends ResponseEntityExceptionHandler {

    protected ResponseEntity<MessageResponse> MaxUploadSizeExceededException() {
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse("File too large!", false));
    }
}