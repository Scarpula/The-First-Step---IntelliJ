package org.example.llm.controller;

import org.example.llm.DTO.LoginDto;
import org.example.llm.DTO.ResponseDto;
import org.example.llm.DTO.SignUpDto;
import org.example.llm.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UserController {
    @Autowired  UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ResponseDto> signUp(@RequestBody SignUpDto requestBody) {
        try {
            ResponseDto result = userService.signUp(requestBody);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseDto(false));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDto> login(@RequestBody LoginDto requestBody) {
        try {
            ResponseDto result = userService.login(requestBody);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseDto(false ));
        }
    }




}
