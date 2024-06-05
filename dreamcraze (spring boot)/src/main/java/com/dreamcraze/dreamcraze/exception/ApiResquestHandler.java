package com.dreamcraze.dreamcraze.exception;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiResquestHandler {
@ExceptionHandler(value = {ApiRequestException.class})    
public ResponseEntity<Object> handleApiRequestException(ApiRequestException e)
    {
        HttpStatus BadRequest=HttpStatus.BAD_REQUEST;
        ApiException apiException= ApiException.builder()
        .message(e.getMessage())
        .timetamp(ZonedDateTime.now(ZoneId.of("Z")))
        .httpStatus(HttpStatus.BAD_REQUEST).build();

        return new ResponseEntity<>(apiException,BadRequest);
    }
}
