//package org.example.llm.controller;
//
//import org.example.llm.Service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//@RestController
//@RequestMapping("/api")
//@CrossOrigin(origins = "*") // 실제 필요한 도메인으로 변경하세요
//public class UserController {
//
//    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
//
//    private final UserService userService;
//
//    @Autowired
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestParam String userId, @RequestParam String password) {
//        logger.info("Login request received for userId: {}", userId);
//
//        if (userService.authenticate(userId, password)) {
//            logger.info("Login successful for userId: {}", userId);
//            return ResponseEntity.ok("Login success!");
//        } else {
//            logger.info("Login failed for userId: {}", userId);
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed!");
//        }
//    }
//}
