package org.example.llm.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private String email;

    @Column(name = "user_pw")
    private String password;
    @Column(name = "user_name")
    private String name;
    @Column(name = "user_birthdate")
    private LocalDate birthdate;
    @Column(name = "Investment_type")
    private String investmentType;



}