package com.dreamcraze.dreamcraze.validation;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import java.util.HashMap;
import java.util.Map;

@Service
public class ValidationUtils {

    public  ResponseEntity<?> handleValidationErrors(BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMessages = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                String fieldName = error.getField();
                String errorMessage = error.getDefaultMessage();
                errorMessages.put(fieldName, errorMessage);
            }
            return ResponseEntity.badRequest().body(errorMessages);
        }
        return null;
    }
}