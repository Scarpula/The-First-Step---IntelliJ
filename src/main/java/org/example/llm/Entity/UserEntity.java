package org.example.llm.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.example.llm.DTO.SignUpDto;

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
    private String email;
    private String password;
    private String name;
    private LocalDate birthdate;
    private String InvestmentType;

    public UserEntity(SignUpDto dto){
        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.name = dto.getName();
        this.birthdate = dto.getBirthdate();
        this.InvestmentType = dto.getInvestment_type();
    }

}