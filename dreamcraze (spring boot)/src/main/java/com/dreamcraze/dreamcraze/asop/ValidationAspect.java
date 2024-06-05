package com.dreamcraze.dreamcraze.asop;

import com.dreamcraze.dreamcraze.validation.ValidationUtils;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Aspect
@Component
public class ValidationAspect {

    @Autowired
    private ValidationUtils validationUtils;

    @Around("@annotation(org.springframework.web.bind.annotation.PostMapping) && args(.., result)")
    public ResponseEntity<?> handleValidation(ProceedingJoinPoint joinPoint, BindingResult result) throws Throwable {
        ResponseEntity<?> response = validationUtils.handleValidationErrors(result);
        return (response != null) ? response : (ResponseEntity<?>) joinPoint.proceed();
    }
}
