package org.example.llm.controller;

import org.example.llm.Entity.UserEntity;
import org.example.llm.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserEntity> register(@RequestBody UserEntity user) {
        UserEntity userEntity = userService.register(user);
        return ResponseEntity.ok(userEntity);
    }

    @PostMapping("/login")
    public ResponseEntity<UserEntity> login(@RequestParam String userId, @RequestParam String password) {
        UserEntity loggedInUser = userService.login(userId, password);
        return ResponseEntity.ok(loggedInUser);
    }


}
