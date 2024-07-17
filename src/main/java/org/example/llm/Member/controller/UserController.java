package org.example.llm.Member.controller;


import jakarta.servlet.http.HttpSession;
import org.example.llm.Member.Entity.UserEntity;
import org.example.llm.Member.dto.Joindto;
import org.example.llm.Member.dto.JwtUtil;
import org.example.llm.Member.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private final JwtUtil jwtUtil;

    private final UserService userService;

    public UserController(JwtUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> join(@RequestBody Joindto joinRequest) {
        try {
            userService.join(joinRequest);
            return ResponseEntity.ok("Join success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Join failed: " + e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        UserEntity user = userService.login(email, password);
        if (user != null) {
            String token = jwtUtil.createToken(email);
            return ResponseEntity.ok().body(Map.of("status", "success", "message", "Login successful","token", token));
        } else {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "Invalid email or password"));
        }
    }

    @GetMapping("/check-auth")
    public ResponseEntity<?> checkAuth(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("isLoggedIn", false, "message", "No token provided"));
        }

        String token = authHeader.substring(7);
        try {
            if (jwtUtil.validateToken(token)) {
                String username = jwtUtil.getUsernameFromToken(token);
                return ResponseEntity.ok().body(Map.of("isLoggedIn", true, "username", username));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("isLoggedIn", false, "message", "Invalid token"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("isLoggedIn", false, "message", "Error processing token"));
        }
    }

}