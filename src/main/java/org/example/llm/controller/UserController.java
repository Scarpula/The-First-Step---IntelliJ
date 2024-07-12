package org.example.llm.controller;

import org.example.llm.Entity.UserEntity;
import org.example.llm.Interface.ApiResponse;
import org.example.llm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody ApiResponse.RegisterRequest request) {
        System.out.println("Received signup request:");
        System.out.println("UserId: " + request.getUserId());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Password: " + request.getPassword());
        System.out.println("Name: " + request.getName());
        System.out.println("Birthdate: " + request.getBirthdate());
        System.out.println("InvestmentType: " + request.getInvestmentType());

        try {
            UserEntity user = new UserEntity();
            user.setEmail(request.getUserId());
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());
            user.setName(request.getName());
            user.setBirthdate(request.getBirthdate());
            user.setInvestmentType(request.getInvestmentType());

            UserEntity newUser = userService.registerUser(user);
            System.out.println("New User Saved: " + newUser);
            return ResponseEntity.ok(new ApiResponse.RegisterResponse("Signup successful"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Signup failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ApiResponse.LoginRequest loginRequest) {
        System.out.println("Received login request for email: " + loginRequest.getEmail());

        UserEntity user = userService.getUserByEmail(loginRequest.getEmail());

        if (user != null) {
            if (loginRequest.getPassword().equals(user.getPassword())) {
                System.out.println("Password match");
                return ResponseEntity.ok(new ApiResponse.LoginResponse("Login successful"));
            } else {
                System.out.println("Password mismatch");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse.LoginResponse("Invalid email or password"));
            }
        } else {
            System.out.println("User not found");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse.LoginResponse("Invalid email or password"));
        }
    }
}