package com.lostandfound.service;

import com.lostandfound.dto.auth.JwtResponse;
import com.lostandfound.dto.auth.SignInRequest;
import com.lostandfound.dto.auth.SignUpRequest;

public interface AuthService {
    JwtResponse signIn(SignInRequest signInRequest);
    JwtResponse signUp(SignUpRequest signUpRequest);
} 