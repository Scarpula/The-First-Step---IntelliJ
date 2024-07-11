package org.example.llm.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName = "set")
public class ResponseDto<L> {
    private boolean result;
    private String message;
    private static Data data;

    public  static ResponseDto setSuccess(String message) {
        return ResponseDto.set(true, message);
    }

    public static  ResponseDto setFailed(String message)
    {
        return ResponseDto.set(false, message);
    }

    public static <data> ResponseDto setSuccessData(String message) {
        return ResponseDto.set(true, message);
    }

    public static <data> ResponseDto setFailedData(String message) {
        return ResponseDto.set(false, message);
    }

}
