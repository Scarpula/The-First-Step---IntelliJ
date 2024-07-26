package org.example.llm.Chatting.repository;

import org.example.llm.Chatting.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {
    List<ChatRoom> findByUserId(String userId);
    long countByUserId(String userId);
    Optional<ChatRoom> findByChatroomIdAndUserId(int chatroomId, String userId);
}