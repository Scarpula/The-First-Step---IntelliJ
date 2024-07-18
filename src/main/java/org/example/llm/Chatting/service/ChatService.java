package org.example.llm.Chatting.service;


import org.example.llm.Chatting.entity.ChatContents;

import java.util.List;

public interface ChatService {
    Long createRoom(String userId);
    void saveMessages(Long roomId, String userId, String userMessage, String botResponse);
    List<ChatContents> getChatHistory(Long roomId, String userId);
    String getCurrentUserId();
}
