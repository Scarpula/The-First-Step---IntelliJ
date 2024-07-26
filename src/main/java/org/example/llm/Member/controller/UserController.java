package org.example.llm.Member.controller;


import jakarta.servlet.http.HttpSession;
import org.example.llm.Member.Entity.UserEntity;
import org.example.llm.Member.dto.Joindto;
//import org.example.llm.Member.dto.KakaoUserDto;
import org.example.llm.Member.dto.LoginResponseDto;
import org.example.llm.Member.dto.PasswordUpdateRequest;
//import org.example.llm.Member.service.KakaoService;
//import org.example.llm.Member.service.KakaoService;
import org.example.llm.Member.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private final HttpSession httpSession;
    private final UserService userService;


    public UserController(HttpSession httpSession, UserService userService) {
        this.httpSession = httpSession;
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
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        try {
            UserEntity user = userService.login(email, password);
            if (user != null) {
                httpSession.setAttribute("user", user);  // 세션에 유저 정보 저장

                String investtype = user.getInvestmentType();
                if (investtype == null) {
                    investtype = "";  // investtype이 null인 경우 빈 문자열로 설정
                }

                return ResponseEntity.ok().body(Map.of(
                        "status", "success",
                        "message", "Login successful",
                        "investtype", investtype  // 응답에 investtype 포함
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                        "status", "error",
                        "message", "Invalid email or password"
                ));
            }
        } catch (Exception e) {
            e.printStackTrace();  // 콘솔에 예외 메시지 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "status", "error",
                    "message", "Internal Server Error",
                    "error", e.getMessage()
            ));
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        httpSession.invalidate();  // 세션 무효화
        return ResponseEntity.ok().body(Map.of("status", "success", "message", "Logout successful"));
    }

    @GetMapping("/session")
    public  ResponseEntity<?> getSession(){
        UserEntity user = (UserEntity) httpSession.getAttribute("user");
        if(user != null){
            return ResponseEntity.ok().body(Map.of("status","success","user",user));
        }else {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "No active session"));
        }
    }

    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody PasswordUpdateRequest request) {
        try {
            userService.updatePassword(request.getEmail(), request.getNewPassword());
            return ResponseEntity.ok("Password updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while updating the password");
        }
    }

//
//    @GetMapping("/kakao")
//    public ResponseEntity<LoginResponseDto> kakaoLogin(@RequestParam("code") String code) {
//        KakaoTokenDto kakaoTokenDto = KakaoService.getKakaoAccessToken(code);
//        return KakaoService.kakaoLogin(kakaoTokenDto.getAccess_token());
//    }

}