package org.example.llm.Member.dto;

import lombok.Data;
import org.example.llm.Member.Entity.UserEntity;

@Data
public class LoginResponseDto {
    private boolean loginSuccess;
    private UserEntity user;
}
