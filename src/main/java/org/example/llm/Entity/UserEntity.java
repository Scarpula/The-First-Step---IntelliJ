package org.example.llm.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "User")
public class UserEntity {
    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_pw", nullable = false)
    private String userPw;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_birthdate", nullable = false)
    private LocalDate userBirthdate;

    @Column(name = "Investment_type", nullable = false)
    private String Investment_type;

}