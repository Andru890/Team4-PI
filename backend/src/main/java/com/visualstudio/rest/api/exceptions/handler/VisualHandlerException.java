package com.visualstudio.rest.api.exceptions.handler;

import com.visualstudio.rest.api.exceptions.ResourceExistException;
import com.visualstudio.rest.api.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class VisualHandlerException
{
	@ExceptionHandler(value = ResourceNotFoundException.class)
	public ResponseEntity<Object> resourceNotFoundException(ResourceNotFoundException exception) {
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("error", exception.getMessage());
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(value = ResourceExistException.class)
	public ResponseEntity<Object> resourceExistException(ResourceExistException exception) {
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("error", exception.getMessage());
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(value = Exception.class)
	public ResponseEntity<Object> globalException(Exception exception) {
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("error", exception.getMessage());
		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}