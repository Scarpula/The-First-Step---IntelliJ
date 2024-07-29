package org.example.llm.Member.service;

import org.example.llm.Member.Entity.UserEntity;
import org.example.llm.Member.Repository.UserRepository;
import org.example.llm.Member.dto.Joindto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;


    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Transactional
    public void join(Joindto joinrequest) {
        String email = joinrequest.getUserId();
        String password = joinrequest.getPassword();
        String name = joinrequest.getName();
        LocalDate birthdate = joinrequest.getBirthdate();
        String investmentType = joinrequest.getInvestmentType();

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }

        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setPassword(password);
        user.setName(name);
        user.setBirthdate(birthdate);
        user.setInvestmentType(investmentType);

        userRepository.save(user);
    }

    public UserEntity login(String email, String password) {
        UserEntity user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
    public void updatePassword(String email, String newPassword) {
        UserEntity user = userRepository.findById(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setPassword(newPassword);
        userRepository.save(user);
    }

    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    @Transactional
    public UserEntity processKakaoUser(Map<String, Object> kakaoUserInfo) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) kakaoUserInfo.get("kakao_account");
        if (kakaoAccount == null) {
            throw new IllegalArgumentException("Kakao account information is missing");
        }

        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
        String email = (String) kakaoAccount.get("email");
        String name = (profile != null && profile.get("nickname") != null) ?
                (String) profile.get("nickname") :
                "KakaoUser" + System.currentTimeMillis(); // 임의의 사용자 이름 생성

        if (email == null) {
            // 이메일이 없는 경우 임의의 이메일 생성
            email = "kakao" + System.currentTimeMillis() + "@example.com";
        }

        // 이메일로 기존 사용자 찾기
        UserEntity user = userRepository.findById(email).orElse(null);

        if (user == null) {
            // 새 사용자 생성
            LocalDate birthdate = LocalDate.of(1900, 1, 1); // 기본값
            if (kakaoAccount.get("birthday") != null) {
                String birthday = (String) kakaoAccount.get("birthday");
                int birthYear = kakaoAccount.get("birth_year") != null ?
                        Integer.parseInt((String) kakaoAccount.get("birth_year")) : 1900;
                birthdate = LocalDate.of(birthYear,
                        Integer.parseInt(birthday.substring(0, 2)),
                        Integer.parseInt(birthday.substring(2)));
            }

            user = UserEntity.builder()
                    .email(email)
                    .name(name)
                    .password("") // 카카오 로그인 사용자는 별도의 비밀번호 없음
                    .birthdate(birthdate)
                    .investmentType("") // 기본값 설정, 필요시 수정
                    .build();
        } else {
            // 기존 사용자 정보 업데이트
            user.setName(name);
        }

        // 사용자 저장 또는 업데이트
        return userRepository.save(user);
    }



}