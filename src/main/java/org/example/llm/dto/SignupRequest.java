package org.example.llm.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@Builder
@ToString(exclude = "password")
public class SignupRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private final String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private final String password;

    @NotBlank(message = "Name is required")
    private final String name;

    @NotNull(message = "Birthdate is required")
    @Past(message = "Birthdate must be in the past")
    private final LocalDate birthdate;

    @NotBlank(message = "Investment type is required")
    private final String investmentType;

    // Custom validation method if needed
    public void validate() {
        // Add any additional validation logic here
    }
}