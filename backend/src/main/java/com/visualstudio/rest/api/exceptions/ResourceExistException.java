package com.visualstudio.rest.api.exceptions;

public class ResourceExistException extends RuntimeException{
    public ResourceExistException(String message) {
        super(message);}
}
