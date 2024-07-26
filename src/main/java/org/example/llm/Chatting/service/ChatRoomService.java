package org.example.llm.Chatting.service;

import org.example.llm.Chatting.entity.ChatRoom;
import org.example.llm.Chatting.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatRoomService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public List<ChatRoom> getChatRoomsByUserId(String userId) {
        return chatRoomRepository.findByUserId(userId);
    }

    public ChatRoom createChatRoom(String userId) {
        long count = chatRoomRepository.countByUserId(userId);
        if (count >= 3) {
            throw new RuntimeException("User can't create more than 3 chat rooms");
        }

        String roomName = "ChatRoom " + (count + 1);

        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setUserId(userId);
        chatRoom.setRoomName(roomName);
        chatRoom.setOpenedAt(LocalDateTime.now());

        return chatRoomRepository.save(chatRoom);
    }

    public boolean deleteChatRoom(int chatroomId, String userId) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findByChatroomIdAndUserId((int) chatroomId, userId);
        if (chatRoom.isPresent()) {
            chatRoomRepository.delete(chatRoom.get());
            return true;
        }
        return false;
    }
}