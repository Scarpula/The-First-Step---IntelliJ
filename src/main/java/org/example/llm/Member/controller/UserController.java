package org.example.llm.Member.controller;


import jakarta.servlet.http.HttpSession;
import org.example.llm.Member.Entity.UserEntity;
import org.example.llm.Member.dto.Joindto;
import org.example.llm.Member.dto.LoginRequest;
import org.example.llm.Member.dto.LoginSession;
import org.example.llm.Member.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    public UserController( UserService userService) {
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
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest, HttpSession session) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        UserEntity user = userService.login(email, password);
        if (user != null) {
            session.setAttribute("user", loginRequest.get(email));
            return ResponseEntity.ok().body(Map.of("status", "success", "message", "Login successful"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "Invalid email or password"));
        }
    }
    @GetMapping("/profile")
    public ResponseEntity<UserEntity> getUserProfile(HttpSession session) {
        String email = (String) session.getAttribute("user");
        if (email != null) {
            UserEntity user = userService.findUserByEmail(email);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
}