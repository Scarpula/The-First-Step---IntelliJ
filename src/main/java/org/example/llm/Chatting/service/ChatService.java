package org.example.llm.Chatting.service;


import org.example.llm.Chatting.entity.ChatContents;
import org.example.llm.Chatting.entity.ChatRoom;

import java.util.List;

public interface ChatService {
    ChatRoom createChatRoom(String userId);
    List<ChatRoom> getChatRooms(String userId);
    void deleteChatRoom(Long roomId, String userId);
}