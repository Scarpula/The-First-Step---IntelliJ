package org.example.llm.controller;

import lombok.RequiredArgsConstructor;
import org.example.llm.Service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class UserContorller {

    private final UserService userService;

    @GetMapping("/user/save")
    public String saveForm() {
        return "save";
    }

    @PostMapping("/user/")
}
