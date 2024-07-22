package org.example.llm.Chatting.repository;

import org.example.llm.Chatting.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface chatRoomRepository extends JpaRepository<ChatRoom, Long> {
    long countByUserId(String userId);
    List<ChatRoom> findByUserIdOrderByOpenedAtDesc(String userId);
    Optional<ChatRoom> findByRoomIdAndUserId(Long roomId, String userId);
}