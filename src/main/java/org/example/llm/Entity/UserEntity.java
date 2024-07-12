package org.example.llm.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class UserEntity {
    @Id
    private String userId; // 이메일이 userId로 사용됩니다.
    private String password;
    private String name;
    private String birthdate;
    private String investmentType;

    @Builder
    public UserEntity(String userId, String password, String name, String birthdate, String investmentType) {
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.birthdate = birthdate;
        this.investmentType = investmentType;
    }
}
