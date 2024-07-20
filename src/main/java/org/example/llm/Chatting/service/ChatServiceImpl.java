package org.example.llm.Chatting.service;

import jakarta.transaction.Transactional;
import org.example.llm.Chatting.entity.ChatContents;
import org.example.llm.Chatting.entity.ChatRoom;
import org.example.llm.Chatting.repository.chatContentsRepository;
import org.example.llm.Chatting.repository.chatRoomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@Transactional
public class ChatServiceImpl implements ChatService{

    private final chatRoomRepository chatRoomRepository;

    private final chatContentsRepository chatContentsRepository;


    public ChatServiceImpl(org.example.llm.Chatting.repository.chatRoomRepository chatRoomRepository, org.example.llm.Chatting.repository.chatContentsRepository chatContentsRepository) {

        this.chatRoomRepository = chatRoomRepository;
        this.chatContentsRepository = chatContentsRepository;
    }


    public Long createRoom(String userId) {
        ChatRoom room = new ChatRoom();
        room.setUserId(userId);
        room.setOpenedAt(LocalDateTime.now());
        room = chatRoomRepository.saveAndFlush(room);
        return room.getRoomId();
    }

    @Override
    public List<ChatRoom> getRoomsByUserId(String userId) {
        return chatRoomRepository.findByUserId(userId);
    }

    @Override
    public void deleteRoom(Long roomId, String userId) {
        ChatRoom room = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        if (!room.getUserId().equals(userId)) {
            throw new RuntimeException("Access denied");
        }
        chatRoomRepository.delete(room);
    }





}
