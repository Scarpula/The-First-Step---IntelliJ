package org.example.llm.controller;

import org.example.llm.Entity.UserEntity;
import org.example.llm.Interface.ApiResponse;
import org.example.llm.dto.UserDTO;
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
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        // 유저 등록 로직
        userService.registerUser(userDTO);
        return ResponseEntity.ok("Signup successful");
    }


    /*@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ApiResponse.LoginRequest loginRequest) {
        System.out.println("Received login request for userId: " + loginRequest.getUserId());

        UserEntity user = userService.getUserById(loginRequest.getUserId());

        if (user != null) {
            if (loginRequest.getPassword().equals(user.getPassword())) {
                System.out.println("Password match");
                return ResponseEntity.ok(new ApiResponse.LoginResponse("Login successful"));
            } else {
                System.out.println("Password mismatch");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse.LoginResponse("Invalid userId or password"));
            }
        } else {
            System.out.println("User not found");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse.LoginResponse("Invalid userId or password"));
        }
    }*/
}
