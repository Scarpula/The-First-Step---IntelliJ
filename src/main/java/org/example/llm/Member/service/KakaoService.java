package org.example.llm.Member.service;

import lombok.Value;
import org.example.llm.Member.dto.KakaoUserDto;
import org.example.llm.Member.Entity.UserEntity;
import org.example.llm.Member.Repository.UserRepository;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoService {
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    @Value("${kakao.api.key}")
    private String kakaoRestApiKey;

    public KakaoService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.restTemplate = new RestTemplate();
    }

    public KakaoUserDto getUserInfo(String accessToken) {
        String url = "https://kapi.kakao.com/v2/user/me";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<KakaoUserDto> response = restTemplate.exchange(url, HttpMethod.GET, entity, KakaoUserDto.class);
        return response.getBody();
    }

    public UserEntity saveOrUpdateUser(KakaoUserDto kakaoUserDto) {
        boolean userExists = userRepository.existsByEmail(kakaoUserDto.getEmail());
        UserEntity user;
        if (userExists) {
            user = userRepository.findByEmail(kakaoUserDto.getEmail());
            user.setName(kakaoUserDto.getNickname());
            // 필요한 다른 필드도 업데이트
        } else {
            user = UserEntity.builder()
                    .email(kakaoUserDto.getEmail())
                    .name(kakaoUserDto.getNickname())
                    // 필요한 다른 필드도 초기화
                    .build();
        }
        return userRepository.save(user);
    }

}
