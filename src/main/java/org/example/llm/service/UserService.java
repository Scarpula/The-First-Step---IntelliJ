package org.example.llm.service;

import org.example.llm.Entity.UserEntity;
import org.example.llm.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public UserEntity registerUser(UserEntity user) {
        return userRepository.save(user);
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
