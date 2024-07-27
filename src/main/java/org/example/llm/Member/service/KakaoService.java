package org.example.llm.Member.service;



import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.example.llm.Member.Entity.UserEntity;
import org.example.llm.Member.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class KakaoService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HttpSession httpSession;

    @Transactional
    public UserEntity processKakaoLogin(String email, String name) {
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            user = UserEntity.builder()
                    .email(email)
                    .name(name)
                    .build();
            user = userRepository.save(user);
        }

        httpSession.setAttribute("user", user);

        return user;
    }




}
