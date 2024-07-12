package org.example.llm.service;

import org.example.llm.Entity.UserEntity;
import org.example.llm.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserEntity registerUser(UserEntity signupRequest) {


        // 새 사용자 엔티티 생성
        UserEntity newUser = UserEntity.builder()
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .name(signupRequest.getName())
                .birthdate(signupRequest.getBirthdate())
                .investmentType(signupRequest.getInvestmentType())
                .build();

        // 사용자 저장 및 반환
        return userRepository.save(newUser);
    }

    @Transactional(readOnly = true)
    public UserEntity getUserById(String userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Transactional(readOnly = true)
    public UserEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}