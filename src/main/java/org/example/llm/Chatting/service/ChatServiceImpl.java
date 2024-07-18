package org.example.llm.Chatting.service;

import jakarta.transaction.Transactional;
import org.example.llm.Chatting.entity.ChatContents;
import org.example.llm.Chatting.entity.ChatRoom;
import org.example.llm.Chatting.repository.chatContentsRepository;
import org.example.llm.Chatting.repository.chatRoomRepository;
import org.example.llm.Member.Entity.UserEntity;
import org.example.llm.Member.Repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ChatServiceImpl implements ChatService{

    private final chatRoomRepository chatRoomRepository;

    private final chatContentsRepository chatContentsRepository;

    private final UserRepository userRepository;

    public ChatServiceImpl(org.example.llm.Chatting.repository.chatRoomRepository chatRoomRepository, org.example.llm.Chatting.repository.chatContentsRepository chatContentsRepository, UserRepository userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatContentsRepository = chatContentsRepository;
        this.userRepository = userRepository;
    }


    public Long createRoom(String userId) {
        Optional<UserEntity> user = userRepository.findById(userId);

        if (user.isPresent()) {
            ChatRoom room = new ChatRoom();
            room.setUserId(userId);
            room.setOpenedAt(LocalDateTime.now());
            room = chatRoomRepository.saveAndFlush(room);
            return room.getRoomId();
        } else {
            throw new IllegalArgumentException("User ID does not exist");
        }
    }


    @Override
    public void saveMessages(Long roomId, String userId, String userMessage, String botResponse) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (!room.getUserId().equals(userId)) {
            throw new RuntimeException("User not authorized for this room");
        }

        saveMessage(room, "user", userMessage);
        saveMessage(room, "chatbot", botResponse);
    }

    private void saveMessage(ChatRoom room, String chatter, String message) {
        ChatContents content = new ChatContents();
        content.setRoomId(room);
        content.setChatter(chatter);
        content.setChatting(message);
        content.setChattedAt(LocalDateTime.now());
        chatContentsRepository.save(content);
    }

    @Override
    public List<ChatContents> getChatHistory(Long roomId, String userId) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (!room.getUserId().equals(userId)) {
            throw new RuntimeException("User not in room");
        }

        return chatContentsRepository.findByRoomIdOrderByChattedAt(room);
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
