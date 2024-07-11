//package org.example.llm.controller;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpSession;
//import org.example.llm.DTO.LoginDto;
//import org.example.llm.DTO.ResponseDto;
//import org.example.llm.DTO.SignUpDto;
//import org.example.llm.Service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Collections;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/api")
//public class UserController {
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    UserService userService;
//
//    @PostMapping("/signup")
//    public ResponseDto<SignUpDto> signUp(@RequestBody SignUpDto requestBody) {
//        System.out.println(requestBody.toString());
//        return null;
//    }
//
//    @PostMapping(value = "/login")
//    public ResponseEntity<List<Map<String, Object>>> login(
//            @RequestBody Map<String, String> request, HttpServletRequest httpRequest
//    ) {
//        String userId = request.get("userId");
//        String enteredPassword = request.get("password");
//
//        // 암호화된 패스워드
//        String storedPasswordHash = userService.getUserPassword(userId);
//
//        // 입력된 비밀번호, 암호화된 비밀번호 비교
//        boolean passwordMatches = passwordEncoder.matches(enteredPassword, storedPasswordHash);
//
//        if (passwordMatches) {
//            List<Map<String, Object>> loginList = userService.login(userId, storedPasswordHash);
//
//            HttpSession session = httpRequest.getSession();
//            session.setAttribute("userId", userId);
//
//            return ResponseEntity.ok(loginList);
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
//        }
//    }
//
//
//
//}
