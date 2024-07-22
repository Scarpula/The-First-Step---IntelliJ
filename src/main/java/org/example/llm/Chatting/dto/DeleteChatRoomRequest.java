package org.example.llm.Chatting.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeleteChatRoomRequest {
    private Long roomId;
    private String userId;
}
