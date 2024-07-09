package org.example.llm.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
//@NoArgsConstructor
@Builder
@Entity
@Table(name = "User")
public class UserEntity {
    @Id
    private String id;
    private String email;
    private String pw;
    private String name;
    private Date birthdate;
    private String Investment_type;


    public UserEntity() {

    }
}
