package org.example.llm.Member.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
@Table(name = "users")
public class UserEntity implements Serializable {
    @Id
    @Column(name = "user_id")
    private String email;

    @Column(name = "user_pw")
    private String password;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_birthdate")
    private LocalDate birthdate;

    @Column(name = "investment_type")
    private String investmentType;



}