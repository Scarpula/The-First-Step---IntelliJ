package org.example.llm.service;

import org.example.llm.Entity.UserEntity;
import org.example.llm.Repository.UserRepository;
import org.example.llm.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void registerUser(UserDTO userDTO) {
        UserEntity user = new UserEntity();
        user.setEmail(userDTO.getUserId());
        user.setPassword(userDTO.getPassword());
        user.setName(userDTO.getName());
        user.setBirthdate(LocalDate.parse(userDTO.getBirthdate()));
        user.setInvestmentType(userDTO.getInvestmentType());

        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public UserEntity getUserById(String userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Transactional(readOnly = true)
    public Optional<UserEntity> getUserByEmail(String email) {
        return userRepository.findById(email);
    }
}