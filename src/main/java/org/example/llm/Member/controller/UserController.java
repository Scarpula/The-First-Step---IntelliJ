package org.example.llm.Member.controller;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpSession;
import org.example.llm.Member.Entity.UserEntity;
import org.example.llm.Member.dto.Joindto;
import org.example.llm.Member.dto.LoginResponse;
import org.example.llm.Member.dto.PasswordUpdateRequest;
import org.example.llm.Member.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Enumeration;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private final HttpSession httpSession;
    private final UserService userService;
    private final RestTemplate restTemplate;

    @Value("${kakao.client.id}")
    private String clientId;

    @Value("${kakao.client.secret}")
    private String clientSecret;

    @Value("${kakao.redirect.uri}")
    private String redirectUri;


    public UserController(HttpSession httpSession, UserService userService, RestTemplate restTemplate) {
        this.httpSession = httpSession;
        this.userService = userService;
        this.restTemplate = restTemplate;
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
    public ResponseEntity<?> checkSession(HttpSession session) {
        System.out.println("Checking session. Session ID: " + session.getId());
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user != null) {
            System.out.println("Active session found for user: " + user.getEmail());
            return ResponseEntity.ok(new LoginResponse(user));
        } else {
            System.out.println("No active session found. Session ID: " + session.getId());

            // 세션 속성 로깅 부분 수정
            Enumeration<String> attributeNames = session.getAttributeNames();
            if (attributeNames.hasMoreElements()) {
                System.out.println("Session attributes: ");
                while (attributeNames.hasMoreElements()) {
                    String attributeName = attributeNames.nextElement();
                    System.out.println(attributeName + ": " + session.getAttribute(attributeName));
                }
            } else {
                System.out.println("No session attributes found.");
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No active session");
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

    @RequestMapping(value = "/kakao/callback", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> kakaoCallback(@RequestParam(value = "code", required = false) String code,
                                           @RequestBody(required = false) Map<String, String> payload,
                                           HttpSession session) {
        System.out.println("Received request for Kakao callback");
        String authCode = (code != null) ? code : (payload != null ? payload.get("code") : null);
        System.out.println("Received Kakao auth code: " + authCode);

        if (authCode == null) {
            return ResponseEntity.badRequest().body("No auth code provided");
        }

        try {
            // 1. 액세스 토큰 얻기
            String tokenUrl = "https://kauth.kakao.com/oauth/token";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type", "authorization_code");
            params.add("client_id", clientId);
            params.add("client_secret", clientSecret);
            params.add("redirect_uri", redirectUri);
            params.add("code", authCode);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

            ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenUrl, request, Map.class);
            String accessToken = (String) tokenResponse.getBody().get("access_token");

            // 2. 사용자 정보 얻기
            String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
            headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, Map.class);
            Map<String, Object> userInfo = userInfoResponse.getBody();

            // 3. 사용자 정보 처리 및 DB 저장
            UserEntity user = userService.processKakaoUser(userInfo);

            // 4. 세션에 사용자 정보 저장
            session.setAttribute("user", user);
            System.out.println("User saved in session: " + user.getEmail() + ", Session ID: " + session.getId());

            // 세션 저장 확인
            UserEntity sessionUser = (UserEntity) session.getAttribute("user");
            if (sessionUser != null) {
                System.out.println("User found in session after save: " + sessionUser.getEmail());
            } else {
                System.out.println("User not found in session after save");
            }

            String investtype = user.getInvestmentType() != null ? user.getInvestmentType() : "";

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, "JSESSIONID=" + session.getId() + "; Path=/; HttpOnly; SameSite=None; Secure")
                    .body(Map.of(
                            "status", "success",
                            "message", "Kakao login successful",
                            "investtype", investtype,
                            "sessionId", session.getId()
                    ));
        } catch (Exception e) {
            System.err.println("Kakao login failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "status", "error",
                    "message", "Kakao login failed: " + e.getMessage()
            ));
        }
    }





}