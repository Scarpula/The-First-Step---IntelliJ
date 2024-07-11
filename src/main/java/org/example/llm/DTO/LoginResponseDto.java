package org.example.llm.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.llm.Entity.UserEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponseDto {
    String email;
    String password;


    public static LoginResponseDto fromUserEntity(UserEntity user) {
        return LoginResponseDto.builder()
                .email(user.getEmail())
                .password(user.getPassword()).build();
                // 필요에 따라 추가 필드 설정

    }
}
