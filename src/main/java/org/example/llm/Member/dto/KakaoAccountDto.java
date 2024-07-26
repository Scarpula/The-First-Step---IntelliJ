package org.example.llm.Member.dto;

import lombok.Data;

@Data
public class KakaoAccountDto {
    private Long id;
    private KakaoAccount kakao_account;

    @Data
    public static class KakaoAccount {
        private String email;
        private Profile profile;

        @Data
        public static class Profile {
            private String nickname;
        }
    }
}
