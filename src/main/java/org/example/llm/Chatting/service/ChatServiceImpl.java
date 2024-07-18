package org.example.llm.Chatting.service;

import org.example.llm.Chatting.entity.ChatContents;
import org.example.llm.Chatting.entity.ChatRoom;
import org.example.llm.Chatting.repository.chatContentsRepository;
import org.example.llm.Chatting.repository.chatRoomRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatServiceImpl implements ChatService{

    private final chatRoomRepository chatRoomRepository;

    private final chatContentsRepository chatContentsRepository;

    public ChatServiceImpl(org.example.llm.Chatting.repository.chatRoomRepository chatRoomRepository, org.example.llm.Chatting.repository.chatContentsRepository chatContentsRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatContentsRepository = chatContentsRepository;
    }


    @Override
    public Long createRoom(String userId) {
        ChatRoom room = new ChatRoom();
        room.setUserId(userId);
        room.setOpenedAt(LocalDateTime.now());
        room.setRoomStatus("ACTIVE");
        room = chatRoomRepository.save(room);
        return room.getRoomId();
    }

    @Override
    public void saveMessages(ChatRoom roomId, String userId, String userMessage, String botResponse) {
        ChatRoom room = chatRoomRepository.findById(roomId.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (!room.getUserId().equals(userId)) {
            throw new RuntimeException("User not authorized for this room");
        }

        saveMessage(roomId, "user", userMessage);
        saveMessage(roomId, "chatbot", botResponse);
    }


    private void saveMessage(ChatRoom roomId, String chatter, String message) {
        ChatContents content = new ChatContents();
        content.setRoomId(roomId);
        content.setChatter(chatter);
        content.setChatting(message);
        content.setChattedAt(LocalDateTime.now());
        chatContentsRepository.save(content);
    }

    @Override
    public List<ChatContents> getChatHistory(ChatRoom roomId, String userId) {
        ChatRoom room = chatRoomRepository.findById(roomId.getRoomId())
                .orElseThrow(()-> new RuntimeException("Room not found"));

        if (!room.getUserId().equals(userId)) {
            throw new RuntimeException("User not in room");
        }

        return chatContentsRepository.findByRoomIdOrderByChattedAt(roomId);
    }
    @Override
    public String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Authentication not set");
        }
        return authentication.getName();
    }
}
