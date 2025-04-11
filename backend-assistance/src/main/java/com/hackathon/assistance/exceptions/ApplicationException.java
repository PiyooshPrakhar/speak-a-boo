package com.hackathon.assistance.exceptions;

import org.springframework.http.HttpStatus;

public class ApplicationException extends RuntimeException {
    private final ApplicationCode applicationCode;
    private final HttpStatus httpStatus;
    public ApplicationException(String message, ApplicationCode applicationCode, HttpStatus httpStatus) {
        super(message);
        this.applicationCode = applicationCode;
        this.httpStatus = httpStatus;
    }

    public ApplicationCode getErrorCode() {
        return applicationCode;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
