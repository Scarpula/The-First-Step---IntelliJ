package org.example.llm.Member.controller;


import jakarta.servlet.http.HttpSession;
import org.example.llm.Member.Entity.UserEntity;
import org.example.llm.Member.dto.Joindto;
import org.example.llm.Member.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api")
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
            session.setAttribute("user", user);  // 세션에 유저 정보 저장
            return ResponseEntity.ok().body(Map.of("status", "success", "message", "Login successful"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "Invalid email or password"));
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();  // 세션 무효화
        return ResponseEntity.ok().body(Map.of("status", "success", "message", "Logout successful"));
    }

    @GetMapping("/session")
    public  ResponseEntity<?> getSession(HttpSession session){
        UserEntity user = (UserEntity) session.getAttribute("user");
        if(user != null){
            return ResponseEntity.ok().body(Map.of("status","success","user",user));
        }else {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "No active session"));
        }
    }


}