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
    private JwtUtil jwtUtil;

    private final UserService userService;

    public UserController(UserService userService) {
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
            String token = jwtUtil.generateToken(email);
            return ResponseEntity.ok().body(Map.of("status", "success", "message", "Login successful"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "Invalid email or password"));
        }
    }

    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                boolean isValid = jwtUtil.validateToken(token);
                return ResponseEntity.ok().body(Map.of("isValid", isValid));
            }
            return ResponseEntity.badRequest().body(Map.of("isValid", false, "message", "Invalid Authorization header"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("isValid", false, "message", e.getMessage()));
        }
    }

}