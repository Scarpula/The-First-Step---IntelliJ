package org.example.llm.Member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordUpdateRequest {
    private String email;
    private String newPassword;
}
