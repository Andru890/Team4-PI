package com.visualstudio.rest.api.exceptions.handler;

import org.springframework.validation.Errors;

public class DataValidException extends Exception {
    public DataValidException(String message) {
        super(message);
    }

    public Errors getBindingResult() {
        return null;
    }

}
