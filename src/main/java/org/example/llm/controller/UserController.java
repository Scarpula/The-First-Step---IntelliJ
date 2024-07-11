package org.example.llm.controller;

import org.example.llm.Entity.UserEntity;
import org.example.llm.Interface.ApiResponse;
import org.example.llm.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ApiResponse.LoginRequest loginRequest) {
        // 로깅
        System.out.println("Received login request for email: " + loginRequest.getEmail());

        // 사용자 조회
        UserEntity user = userRepository.findByEmail(loginRequest.getEmail());

        if (user != null) {
            // 비밀번호 비교
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                // 비밀번호 일치
                System.out.println("Password match");
                return ResponseEntity.ok(new ApiResponse.LoginResponse("Login successful"));
            } else {
                // 비밀번호 불일치
                System.out.println("Password mismatch");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse.LoginResponse("Invalid email or password"));
            }
        } else {
            // 사용자 없음
            System.out.println("User not found");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse.LoginResponse("Invalid email or password"));
        }
    }
}
