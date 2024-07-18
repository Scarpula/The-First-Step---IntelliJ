package org.example.llm.Chatting.dto;

import lombok.Data;
import org.example.llm.Chatting.entity.ChatRoom;

@Data
public class chatMessageDto {
    private ChatRoom roomId;
    private String userMessage;
    private String botResponse;
}
