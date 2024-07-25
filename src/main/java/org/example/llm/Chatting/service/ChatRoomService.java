package org.example.llm.Chatting.service;

import org.example.llm.Chatting.entity.ChatRoom;
import org.example.llm.Chatting.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatRoomService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public List<ChatRoom> getChatRoomsByUserId(String userId) {
        return chatRoomRepository.findByUserId(userId);
    }
}