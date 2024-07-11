//package org.example.llm.controller;
//
//import org.example.llm.Entity.UserEntity;
//import org.example.llm.Service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//
//@Controller
//@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/api")
//public class UserController {
//
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/signup")
//    public ResponseEntity<UserEntity> register(@RequestBody UserEntity user) {
//        UserEntity userEntity = userService.register(user);
//        return ResponseEntity.ok(userEntity);
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<UserEntity> login(@RequestParam String userId, @RequestParam String password) {
//        UserEntity loggedInUser = userService.login(userId, password);
//        return ResponseEntity.ok(loggedInUser);
//    }
//
//
//}
