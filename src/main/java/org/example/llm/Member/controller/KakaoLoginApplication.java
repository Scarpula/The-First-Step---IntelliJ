//package org.example.llm.Member.controller;
//
//
//import jakarta.servlet.http.HttpSession;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.client.RestTemplate;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api")
//public class KakaoLoginApplication {
//
//    @Value("${kakao.client.id}")
//    private String clientId;
//
//    @Value("${kakao.client.secret}")
//    private String clientSecret;
//
//    @Value("${kakao.redirect.uri}")
//    private String redirectUri;
//
//    @Autowired
//    private RestTemplate restTemplate;
//
//    @PostMapping("kakao/callback")
//    public ResponseEntity<?> kakaoCallback(@RequestBody Map<String, String> payload, HttpSession session) {
//        String code = payload.get("code");
//

//        String tokenUrl = "https://kauth.kakao.com/oauth/token";
//        Map<String, String> params = new HashMap<>();
//        params.put("grant_type", "authorization_code");
//        params.put("client_id", clientId);
//        params.put("client_secret", clientSecret);
//        params.put("redirect_uri", redirectUri);
//        params.put("code", code);
//
//        ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenUrl, params, Map.class);
//        String accessToken = (String) tokenResponse.getBody().get("access_token");
//

//        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBearerAuth(accessToken);
//        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
//
//        ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, Map.class);
//        Map<String, Object> userInfo = userInfoResponse.getBody();
//

//

//        session.setAttribute("user", userInfo);
//
//        return ResponseEntity.ok().body(userInfo);
//    }
//
//}
