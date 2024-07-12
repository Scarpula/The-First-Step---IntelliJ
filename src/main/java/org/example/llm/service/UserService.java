package org.example.llm.service;

import org.example.llm.Entity.UserEntity;
import org.example.llm.Repository.UserRepository;
import org.example.llm.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void registerUser(UserDTO userDTO) {
        UserEntity user = new UserEntity();
        user.setUserId(userDTO.getUserId());
        user.setPassword(userDTO.getPassword());
        user.setName(userDTO.getName());
        user.setBirthdate(userDTO.getBirthdate());
        user.setInvestmentType(userDTO.getInvestmentType());

        userRepository.save(user);
    }
}
