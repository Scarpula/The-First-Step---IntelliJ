//package org.example.llm.Member.service;
//
//import lombok.Setter;
//import org.example.llm.Member.Entity.UserEntity;
//import org.example.llm.Member.Repository.UserRepository;
//import org.example.llm.Member.dto.KakaoTokenResponse;
//import org.example.llm.Member.dto.KakaoUserInfoResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class KakaoLoginService {
//    @Autowired
//    private RestTemplate restTemplate;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Value("${kakao.client.id}")
//    private String clientId;
//
//    @Value("${kakao.client.secret}")
//    private String clientSecret;
//
//    @Value("${kakao.redirect-uri}")
//    private String redirectUri;
//
//    private final String KAKAO_TOKEN_URI = "https://kauth.kakao.com/oauth/token";
//    private final String KAKAO_USER_INFO_URI = "https://kapi.kakao.com/v2/user/me";
//
//    public UserEntity processKakaoLogin(String code) {
//        String accessToken = getAccessToken(code);
//        KakaoUserInfoResponse userInfo = getUserInfo(accessToken);
//        return saveOrUpdateUser(userInfo);
//    }
//
//    private String getAccessToken(String code) {
//        Map<String, String> params = new HashMap<>();
//        params.put("grant_type", "authorization_code");
//        params.put("client_id", clientId);
//        params.put("client_secret", clientSecret);
//        params.put("redirect_uri", redirectUri);
//        params.put("code", code);
//
//        ResponseEntity<KakaoTokenResponse> response = restTemplate.postForEntity(KAKAO_TOKEN_URI, params, KakaoTokenResponse.class);
//        if (response.getStatusCode() == HttpStatus.OK) {
//            return response.getBody().getAccess_token();
//        }
//        throw new RuntimeException("Failed to get access token from Kakao");
//    }
//
//    private KakaoUserInfoResponse getUserInfo(String accessToken) {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBearerAuth(accessToken);
//        HttpEntity<String> entity = new HttpEntity<>("", headers);
//
//        ResponseEntity<KakaoUserInfoResponse> response = restTemplate.exchange(KAKAO_USER_INFO_URI, HttpMethod.GET, entity, KakaoUserInfoResponse.class);
//        if (response.getStatusCode() == HttpStatus.OK) {
//            return response.getBody();
//        }
//        throw new RuntimeException("Failed to get user info from Kakao");
//    }
//
//    private UserEntity saveOrUpdateUser(KakaoUserInfoResponse userInfo) {
//        UserEntity user = userRepository.findById(userInfo.getKakao_account().getEmail())
//                .orElse(new UserEntity());
//
//        user.setEmail(userInfo.getKakao_account().getEmail());
//        user.setName(userInfo.getKakao_account().getProfile().getNickname());
//
//        if (user.getPassword() == null) {
//            user.setPassword("KAKAO_USER");
//        }
//        if (user.getInvestmentType() == null) {
//            user.setInvestmentType("NOT_SET");
//        }
//
//        return userRepository.save(user);
//    }
//}
//