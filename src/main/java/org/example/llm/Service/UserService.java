package org.example.llm.Service;

import org.example.llm.Entity.UserEntity;
import org.example.llm.Repository.LoginResponse;
import org.example.llm.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponse login(String email, String password) {
        try {
            UserEntity user = userRepository.findByEmail(email);
            if (user != null && user.getPassword().equals(password)) {
                // 로그인 성공
                return new LoginResponse(true, "Login successful");
            } else {
                // 로그인 실패
                return new LoginResponse(false, "Invalid email or password");
            }
        } catch (Exception e) {
            // 예외 발생 시 처리
            return new LoginResponse(false, "An internal server error occurred");
        }
    }
}