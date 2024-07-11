package org.example.llm.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Users")
@Getter
@Setter
public class UserEntity {
    @Id
    @Column(name = "user_id")
    private String email;
    @Column(name = "user_pw")
    private String password;
    @Column(name = "user_name")
    private String name;
    @Column(name = "user_birthdate")
    private LocalDate birthdate;
    @Column(name = "Investment_type")
    private String InvestmentType;



}