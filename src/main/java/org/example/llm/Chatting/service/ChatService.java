package org.example.llm.Chatting.service;


import org.example.llm.Chatting.entity.ChatContents;
import org.example.llm.Chatting.entity.ChatRoom;

import java.util.List;

public interface ChatService {
    Long createRoom(String userId);
    void saveMessages(ChatRoom roomId, String userId, String userMessage, String botResponse);
    List<ChatContents> getChatHistory(ChatRoom roomId, String userId);
    String getCurrentUserId();
}
