package org.example.llm.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.example.llm.Entity.UserEntity;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserDTO {
    private String id;
    private String pw;
    private String name;
    private Date birthdate;
    private String Investment_type;

    public static UserDTO toUserDTO(UserEntity userEntity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userEntity.getId());
        userDTO.setPw(userEntity.getPw());
        userDTO.setName(userEntity.getName());
        userDTO.setBirthdate(userEntity.getBirthdate());
        userDTO.setInvestment_type(userEntity.getInvestment_type());

        return userDTO;
    }
}
