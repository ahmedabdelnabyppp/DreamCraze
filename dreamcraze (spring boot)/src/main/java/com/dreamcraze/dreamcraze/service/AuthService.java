package com.dreamcraze.dreamcraze.service;

import java.util.Random;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.dreamcraze.dreamcraze.exception.ApiRequestException;
import com.dreamcraze.dreamcraze.model.Role;
import com.dreamcraze.dreamcraze.model.User;
import com.dreamcraze.dreamcraze.repository.UserRepository;
import com.dreamcraze.dreamcraze.request.AuthRequest;
import com.dreamcraze.dreamcraze.request.RegisterRequest;
import com.dreamcraze.dreamcraze.response.AuthResponse;
import com.dreamcraze.dreamcraze.security.jwt.JwtService;

import jakarta.mail.MessagingException;

@Service
public class AuthService {
        @Autowired
        private UserRepository userRepository;
        @Autowired
        private PasswordEncoder passwordEncoder;
        @Autowired
        private JwtService jwtService;
        @Autowired
        private AuthenticationManager authenticationManager;
        @Autowired
        private EmailService emailService;

        private String TemproalOpt;
        private User TemproalUser;

        public ResponseEntity<?> register(RegisterRequest request) throws MessagingException {
                Optional<User> Exist_Email = userRepository.findByEmail(request.getEmail());
                if (!Exist_Email.isEmpty()) {
                        throw new ApiRequestException("user is already exist");
                } else {

                        Random RandomNumber = new Random();
                        String Otp = String.format("%06d", RandomNumber.nextInt(100000));
                        this.TemproalOpt = Otp;
                        User user = User.builder()
                                        .name(request.getName())
                                        .password(passwordEncoder.encode(request.getPassword()))
                                        .email(request.getEmail())
                                        .role(Role.USER)
                                        .phone(request.getPhone())
                                        .build();
                        this.TemproalUser = user;
                        this.emailService.sendEmail(user.getEmail(), Otp);
                }
                return null;
        }

        public AuthResponse createUser(String Otp) {
                if (VerifycationOpt(Otp)) {
                        userRepository.save(TemproalUser);
                        var jwtToken = jwtService.generateToken(TemproalUser);
                        this.TemproalOpt = "";
                        this.TemproalUser = null;
                        return AuthResponse.builder()
                                        .token(jwtToken)
                                        .build();
                } else {
                        throw new ApiRequestException("is wrong in : " + "Otp");
                }
        }

        private boolean VerifycationOpt(String Opt) {
                if (Opt.equals(TemproalOpt)) {
                        return true;
                }
                return false;
        }

        public AuthResponse Authentication(AuthRequest request) {
                try {
                        authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(request.getEmail(),
                                                        request.getPassword()));
                        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new ApiRequestException("User not found"));
                        String jwtToken = jwtService.generateToken(user);
                
                        return AuthResponse.builder()
                                        .token(jwtToken)
                                        .build();
                } catch (BadCredentialsException e) {
                        throw new ApiRequestException("Invalid email or password");
                }
        }
}
