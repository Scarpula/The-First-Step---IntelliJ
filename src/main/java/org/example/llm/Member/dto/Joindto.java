package org.example.llm.Member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
public class Joindto {
    private String userId;
    private String password;
    private String name;
    private LocalDate birthdate;
    private String investmentType;


}