package org.example.llm.Service;

import jakarta.transaction.Transactional;
import org.example.llm.DTO.LoginDto;
import org.example.llm.DTO.LoginResponseDto;
import org.example.llm.DTO.ResponseDto;
import org.example.llm.DTO.SignUpDto;
import org.example.llm.Entity.UserEntity;
import org.example.llm.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
    public ResponseDto signUp(SignUpDto signUpDto) {
        String email = signUpDto.getEmail();

        if(userRepository.existsById(email)) {
            return ResponseDto.setFailed("중복된 Email 입니다.");
        }

        UserEntity userEntity = new UserEntity(signUpDto);
        userEntity.setPassword(passwordEncoder.encode(signUpDto.getPassword()));

        userRepository.save(userEntity);
        return ResponseDto.setSuccessData(Boolean.parseBoolean("회원 생성에 성공했습니다."));
    }
    public ResponseDto login(LoginDto dto) {
        UserEntity user = userRepository.findByEmail(dto.getEmail());
        if (user == null || !passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            return ResponseDto.setFailed("입력하신 로그인 정보가 존재하지 않습니다.");
        }

        LoginResponseDto loginResponse = LoginResponseDto.fromUserEntity(user);
        return ResponseDto.setSuccessData("로그인에 성공하였습니다.", loginResponse);
    }





}


