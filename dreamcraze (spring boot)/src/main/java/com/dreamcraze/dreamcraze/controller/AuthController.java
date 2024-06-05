package com.dreamcraze.dreamcraze.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dreamcraze.dreamcraze.request.AuthRequest;
import com.dreamcraze.dreamcraze.request.OtpRequest;
import com.dreamcraze.dreamcraze.request.RegisterRequest;
import com.dreamcraze.dreamcraze.security.jwt.JwtAuthGuard;
import com.dreamcraze.dreamcraze.service.AuthService;


import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/auth")

public class AuthController {
    @Autowired
    private AuthService service;

    @Autowired
    private JwtAuthGuard jwtAuthGuard;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request, BindingResult result)
            throws MessagingException {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/verificationOtp")
    public ResponseEntity<?> verificationOtp(@Valid @RequestBody OtpRequest Otp) throws MessagingException {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createUser(Otp.getOtp()));
    }

    @PostMapping("/authentication")
    public ResponseEntity<?> authentication(@Valid @RequestBody AuthRequest request, BindingResult result) {
        return ResponseEntity.ok(service.Authentication(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        jwtAuthGuard.handleLogout(request); // Call the handleLogout method from JwtAuthGuard
        return ResponseEntity.ok("Logged out successfully");
    }
}
