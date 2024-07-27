package org.example.llm.Member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoTokenRequest {
    private String accessToken;
    private String refreshToken;
}
