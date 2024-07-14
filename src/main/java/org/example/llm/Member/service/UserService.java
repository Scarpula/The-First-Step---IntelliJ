package org.example.llm.Member.service;

import org.example.llm.Member.Entity.UserEntity;
import org.example.llm.Member.Repository.UserRepository;
import org.example.llm.Member.dto.Joindto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

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
}