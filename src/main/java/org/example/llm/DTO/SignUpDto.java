package org.example.llm.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {
    private String id;
    private String email;
    private String name;
    private String password;
    private String confirmPassword;
    private LocalDate birthdate;
    private String Investment_type;
}
