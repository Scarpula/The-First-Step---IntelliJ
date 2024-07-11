//package org.example.llm.controller;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api")
//@CrossOrigin(origins = "*")  // CORS 설정
//public class LoginController {
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
//        String hardcodedEmail = "user@example.com";
//        String hardcodedPassword = "password123";
//
//        if (loginRequest.getEmail().equals(hardcodedEmail) && loginRequest.getPassword().equals(hardcodedPassword)) {
//            return ResponseEntity.ok(new LoginResponse("Login successful"));
//        } else {
//            return ResponseEntity.status(401).body(new LoginResponse("Invalid email or password"));
//        }
//    }
//
//    public static class LoginRequest {
//        private String email;
//        private String password;
//
//        // Getters and Setters
//        public String getEmail() {
//            return email;
//        }
//
//        public void setEmail(String email) {
//            this.email = email;
//        }
//
//        public String getPassword() {
//            return password;
//        }
//
//        public void setPassword(String password) {
//            this.password = password;
//        }
//    }
//
//    public static class LoginResponse {
//        private String message;
//
//        public LoginResponse(String message) {
//            this.message = message;
//        }
//
//        // Getter
//        public String getMessage() {
//            return message;
//        }
//    }
//}