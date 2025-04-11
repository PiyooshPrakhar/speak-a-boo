package com.hackathon.assistance.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandler {

    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<ErrorResponse> handleApplicationException(ApplicationException ex) {
        ErrorResponse errorResponse = new ErrorResponse(LocalDateTime.now(),
                ex.getHttpStatus().toString(),
                ex.getErrorCode().name(),
                ex.getMessage());
        return ResponseEntity.status(ex.getHttpStatus()).body(errorResponse);
    }
}
