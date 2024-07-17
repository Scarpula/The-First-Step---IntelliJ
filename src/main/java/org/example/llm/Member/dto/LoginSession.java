package org.example.llm.Member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.llm.Member.Entity.UserEntity;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginSession implements Serializable {
    private String email;
    private String name;
    private LocalDate birthdate;
    private String investmentType;

    // UserEntity로부터 LoginSession 객체를 생성하는 정적 메서드
    public static LoginSession fromUserEntity(UserEntity user) {
        return LoginSession.builder()
                .email(user.getEmail())
                .name(user.getName())
                .birthdate(user.getBirthdate())
                .investmentType(user.getInvestmentType())
                .build();
    }
}
