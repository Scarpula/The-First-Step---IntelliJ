package org.example.llm.Chatting.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.llm.Chatting.entity.ChatRoom;


@Getter
@Setter
public class ChatMessageDTO {
    private ChatRoom roomId;
    private String chatting;
    private String sender;
}
