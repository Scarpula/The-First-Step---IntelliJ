package org.example.llm.Chatting.repository;

import org.example.llm.Chatting.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface chatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findByUserId(String userId);
}