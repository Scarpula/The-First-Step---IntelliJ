package org.example.llm.Member.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
@Table(name = "users")
public class UserEntity {
    @Id
    @Column(name = "user_id")
    private String email;


    private String password;

    private String name;

    private LocalDate birthdate;

    private String investmentType;



}