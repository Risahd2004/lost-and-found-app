package com.lostandfound.controller;

import com.lostandfound.dto.auth.JwtResponse;
import com.lostandfound.dto.auth.SignInRequest;
import com.lostandfound.dto.auth.SignUpRequest;
import com.lostandfound.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody SignInRequest signInRequest) {
        JwtResponse response = authService.signIn(signInRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        JwtResponse response = authService.signUp(signUpRequest);
        return ResponseEntity.ok(response);
    }
} 