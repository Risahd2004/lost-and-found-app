package com.lostandfound.service.impl;

import com.lostandfound.dto.auth.JwtResponse;
import com.lostandfound.dto.auth.SignInRequest;
import com.lostandfound.dto.auth.SignUpRequest;
import com.lostandfound.entity.User;
import com.lostandfound.enums.UserRole;
import com.lostandfound.repository.UserRepository;
import com.lostandfound.security.JwtTokenProvider;
import com.lostandfound.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Override
    public JwtResponse signIn(SignInRequest signInRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                signInRequest.getEmail(),
                signInRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        
        User user = userRepository.findByEmail(signInRequest.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        return new JwtResponse(jwt, user.getId(), user.getEmail(), user.getFullName(), user.getRole());
    }

    @Override
    public JwtResponse signUp(SignUpRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }

        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setFullName(signUpRequest.getFullName());
        user.setRole(UserRole.USER); // Default role for new users

        userRepository.save(user);

        // Sign in the user after registration
        SignInRequest signInRequest = new SignInRequest();
        signInRequest.setEmail(signUpRequest.getEmail());
        signInRequest.setPassword(signUpRequest.getPassword());
        
        return signIn(signInRequest);
    }
} 