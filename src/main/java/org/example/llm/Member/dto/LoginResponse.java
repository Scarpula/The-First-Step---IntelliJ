package org.example.llm.Member.dto;

import lombok.Getter;
import org.example.llm.Member.Entity.UserEntity;

@Getter
public class LoginResponse {
    private String email;
    private String name;

    public LoginResponse(UserEntity user) {
        this.email = user.getEmail();
        this.name = user.getName();
    }
}
