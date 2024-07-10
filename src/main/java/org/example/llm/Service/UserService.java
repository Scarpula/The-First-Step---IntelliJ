package org.example.llm.Service;

import org.example.llm.Entity.UserEntity;
import org.example.llm.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    private UserRepository userRepository;

    public UserEntity register(UserEntity user) {
        if (userRepository.findByUserId(user.getUserId()).isPresent()) {
            throw new RuntimeException("이미 존재하는 사용자 ID입니다.");
        }
        user.setUserPw(passwordEncoder.encode(user.getUserPw()));
        return userRepository.save(user);
    }

    public UserEntity login(String userId, String password) {
        UserEntity user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다"));
        if (!passwordEncoder.matches(password, user.getUserPw())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        return user;
    }
}