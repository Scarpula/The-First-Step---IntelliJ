//package org.example.llm.Member.service;
//
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.DeserializationFeature;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//import org.example.llm.Member.dto.KakaoAccountDto;
//import org.example.llm.Member.dto.LoginResponseDto;
//import org.springframework.beans.factory.annotation.Value;
//import org.example.llm.Member.dto.KakaoUserDto;
//import org.example.llm.Member.Entity.UserEntity;
//import org.example.llm.Member.Repository.UserRepository;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//
//import java.net.URI;
//
//@Service
//public class KakaoService {
//
//    private static final URI KAKAO_USER_INFO_URI = ;
//    private final UserRepository userRepository;
//
//    public KakaoService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    public ResponseEntity<LoginResponseDto> kakaoLogin(String kakaoAccessToken) {
//        UserEntity user = getKakaoInfo(kakaoAccessToken);
//
//        LoginResponseDto loginResponseDto = new LoginResponseDto();
//        loginResponseDto.setLoginSuccess(true);
//        loginResponseDto.setUser(user);
//
//        return ResponseEntity.ok().body(loginResponseDto);
//    }
//
//    public UserEntity getKakaoInfo(String kakaoAccessToken) {
//        RestTemplate rt = new RestTemplate();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorization", "Bearer " + kakaoAccessToken);
//        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);
//
//        ResponseEntity<String> accountInfoResponse = rt.exchange(
//                KAKAO_USER_INFO_URI,
//                HttpMethod.POST,
//                accountInfoRequest,
//                String.class
//        );
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        KakaoAccountDto kakaoAccountDto = null;
//        try {
//            kakaoAccountDto = objectMapper.readValue(accountInfoResponse.getBody(), KakaoAccountDto.class);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        return processKakaoUser(kakaoAccountDto);
//    }
//
//    private UserEntity processKakaoUser(KakaoAccountDto kakaoAccountDto) {
//        String email = kakaoAccountDto.getKakao_account().getEmail();
//        UserEntity existingUser = userRepository.findByEmail(email).orElse(null);
//
//        if (existingUser != null) {
//            return existingUser;
//        } else {
//            UserEntity newUser = UserEntity.builder()
//                    .email(email)
//                    .name(kakaoAccountDto.getKakao_account().getProfile().getNickname())
//                     다른 필드들은 null 또는 기본값으로 설정
//                    .build();
//            return userRepository.save(newUser);
//        }
//    }
//
//}
