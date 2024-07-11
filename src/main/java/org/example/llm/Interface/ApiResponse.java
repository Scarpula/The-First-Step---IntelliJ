package org.example.llm.Interface;

import org.example.llm.Entity.UserEntity;

import java.time.LocalDate;

public interface ApiResponse {

    public static class RegisterRequest {
        private String email;
        private static String password;
        private String name;
        private LocalDate birthdate;
        private String investmentType;

        // Getters and Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public static String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public LocalDate getBirthdate() { return birthdate; }
        public void setBirthdate(LocalDate birthdate) { this.birthdate = birthdate; }
        public String getInvestmentType() { return investmentType; }
        public void setInvestmentType(String investmentType) { this.investmentType = investmentType; }
    }

    public static class UpdateRequest {
        private String name;
        private LocalDate birthdate;
        private String investmentType;

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public LocalDate getBirthdate() { return birthdate; }
        public void setBirthdate(LocalDate birthdate) { this.birthdate = birthdate; }
        public String getInvestmentType() { return investmentType; }
        public void setInvestmentType(String investmentType) { this.investmentType = investmentType; }
    }

    public static class RegisterResponse {
        private String message;

        public RegisterResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
    }

    public static class UpdateResponse {
        private String message;

        public UpdateResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
    }

    public static class DeleteResponse {
        private String message;

        public DeleteResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
    }

    public static class UserResponse {
        private String email;
        private String name;
        private LocalDate birthdate;
        private String investmentType;

        public UserResponse(UserEntity user) {
            this.email = user.getEmail();
            this.name = user.getName();
            this.birthdate = user.getBirthdate();
            this.investmentType = user.getInvestmentType();
        }

        // Getters
        public String getEmail() { return email; }
        public String getName() { return name; }
        public LocalDate getBirthdate() { return birthdate; }
        public String getInvestmentType() { return investmentType; }
    }

    public static class ErrorResponse {
        private String error;

        public ErrorResponse(String error) { this.error = error; }
        public String getError() { return error; }
    }

    public static class LoginRequest {
        private String email;
        private String password;

        // Getters and Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class LoginResponse {
        private String message;

        public LoginResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
    }
}
