package org.example.llm.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName = "set")
public class ResponseDto {
    private boolean success;
    private String message;
    private Data data;

    public ResponseDto(boolean success) {
        this.success = success;
        this.message = message;
    }


    public static ResponseDto setFailed(String s) {
    }

    public static ResponseDto setSuccessData(String s, LoginResponseDto loginResponse) {
    }

    public static ResponseDto setSuccessData(boolean b) {
    }
}
