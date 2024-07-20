package org.example.llm.Chatting.service;


import org.example.llm.Chatting.entity.ChatContents;
import org.example.llm.Chatting.entity.ChatRoom;

import java.util.List;

public interface ChatService {
    Long createRoom(String userId);
    List<ChatRoom> getRoomsByUserId(String userId);
    void deleteRoom(Long roomId, String userId);

}
