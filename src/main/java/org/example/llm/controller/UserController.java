package org.example.llm.controller;

import org.example.llm.DTO.LoginDto;
import org.example.llm.DTO.ResponseDto;
import org.example.llm.DTO.SignUpDto;
import org.example.llm.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UserController {
    @Autowired  UserService userService;

    @PostMapping("/signup")
    public ResponseDto<SignUpDto> signUp(@RequestBody SignUpDto requestBody) {
        System.out.println(requestBody.toString());
        return null;
    }

    @PostMapping("/login")
    public ResponseDto login(@RequestBody LoginDto requestBody) {
        ResponseDto<?> result = UserService.login(requestBody);
        return result;
    }




}
